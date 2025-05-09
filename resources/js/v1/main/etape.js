import { demarrerTournee } from '../api/etapes';
import { cloturerTournee } from '../api/etapes';
import { fetchEtapesTournee } from '../api/etapes';
import { storeEtapes } from '../api/etapes';
import { showMessage } from '../pages/notif';

// Pour démarrer une tournée
window.demarrerTournee = demarrerTournee;

// Pour clôturer une tournée
window.cloturerTournee = cloturerTournee;

// Pour la récupération des étapes d'une tournée
// Debut
let allEtapes = [];
let searchQuery = "";
let entriesPerPage = 10;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', async () => {
    const keytournee = window.keytournee;
    if (!keytournee) {
        console.error("Clé de tournée manquante.");
        return;
    }

    const { etapes } = await fetchEtapesTournee(keytournee);
    allEtapes = etapes;
    afficherEtapesDansLeDOM(allEtapes);

    document.getElementById('search-input').addEventListener('input', e => {
        searchQuery = e.target.value;
        currentPage = 1;
        afficherEtapesDansLeDOM(allEtapes);
    });

    document.getElementById('entries-select').addEventListener('change', e => {
        entriesPerPage = parseInt(e.target.value);
        currentPage = 1;
        afficherEtapesDansLeDOM(allEtapes);
    });
});
// L'affichage du contenu
function afficherEtapesDansLeDOM(etapes) {
    const tbody = document.getElementById('etapes-body');
    tbody.innerHTML = '';

    const filteredEtapes = etapes.filter(etape => {
        return etape.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
               etape.longitude.toString().includes(searchQuery) ||
               etape.latitude.toString().includes(searchQuery) ||
               new Date(etape.dateposition).toLocaleString().includes(searchQuery);
    });

    const total = filteredEtapes.length;

    if (total === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Aucune étape trouvée.</td></tr>';
        document.getElementById('pagination-container').innerHTML = '';
        return;
    }

    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentEtapes = filteredEtapes.slice(start, end);

    currentEtapes.forEach((etape, index) => {
        const row = document.createElement('tr');
        const createdAt = new Date(etape.dateposition);
        const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth() + 1).toString().padStart(2, '0')}/${createdAt.getFullYear()} à ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${etape.position}</td>
            <td>${etape.longitude}</td>
            <td>${etape.latitude}</td>
            <td>${formattedDate}</td>
            <td class="text-center">
                <div class="flex justify-center gap-2">
                    <a href="" class="btn btn-sm btn-outline-primary" title="Modifier cette étape">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                    </a>
                    <a href="" class="btn btn-sm btn-outline-danger" title="Supprimer cette étape">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                        </svg>
                    </a>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    renderPagination(total);
}
// Pour la pagination
function renderPagination(total) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(total / entriesPerPage);

    if (totalPages > 1) {
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `px-3 py-1 rounded border ${i === currentPage ? 'bg-yellow-500 text-white' : 'bg-white'}`;
            btn.onclick = () => {
                currentPage = i;
                afficherEtapesDansLeDOM(allEtapes);
            };
            paginationContainer.appendChild(btn);
        }
    }
}
// Fin

// Pour ajouter les étapes des tournées en cours d'un fret
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addetape-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const tourneesContainer = document.getElementById('tournees-container');
        const blocks = tourneesContainer.querySelectorAll('div.space-y-5.border-b');

        const groupedEtapes = new Map();

        blocks.forEach((block) => {
            const tournee_id = block.querySelector('input[name="tournee_ids[]"]')?.value;
            const position = block.querySelector('input[name="position[]"]')?.value;
            const latitude = block.querySelector('input[name="latitude[]"]')?.value;
            const longitude = block.querySelector('input[name="longitude[]"]')?.value;

            if (tournee_id && position && latitude && longitude) {
                const etape = {
                    position,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude)
                };

                if (!groupedEtapes.has(tournee_id)) {
                    groupedEtapes.set(tournee_id, []);
                }

                groupedEtapes.get(tournee_id).push(etape);
            }
        });

        if (groupedEtapes.size === 0) {
            showMessage('Veuillez remplir au moins une étape.', 'top-end', 'error');
            return;
        }

        const donneesEtapes = Array.from(groupedEtapes.entries()).map(([tournee_id, etapes]) => ({
            tournee_id: parseInt(tournee_id),
            etapes
        }));
        const result = await storeEtapes(donneesEtapes);

        if (result.success) {
            showMessage('Étapes enregistrées avec succès !');
            setTimeout(() => {
                form.reset();
                window.location.reload();
            }, 1500);
        } else {
            showMessage(result.message || 'Erreur lors de l’enregistrement.', 'top-end', 'error');
        }
    });
});

// Pour afficher quelques infos utiles de tournée
document.addEventListener('DOMContentLoaded', async () => {
    const keytournee = window.keytournee;
    const numeroTournee = document.getElementById('numeroTournee');

    const { tournee }  = await fetchEtapesTournee(keytournee);

    if (tournee) {
        numeroTournee.innerHTML = `Etapes de la tournée num. ${tournee.numerotournee}`;
    } else {
        numeroTournee.innerHTML = '<span class="text-red-500">(Tournée introuvable)</span>';
    }
});
