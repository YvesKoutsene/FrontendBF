import { fetchFretsAttribues } from '../api/frets';
import { showFret } from '../api/frets';
import { showMessage } from '../pages/notif';

// Pour la récupération des frets attribués sur different onglets
// Début
let allFrets = [];
let searchQuery = "";
let entriesPerPage = 10;
let pagination = {
    incomplets: 1,
    complets: 1,
    statut40: 1,
    statut50: 1
};

document.addEventListener('DOMContentLoaded', async () => {
    allFrets = await fetchFretsAttribues();

    setupControls();
    renderAllGroups();

    // Gestion des onglets
    document.querySelectorAll('[data-statut]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-statut]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const group = tab.getAttribute('data-statut');
            document.querySelectorAll('.fret-table-group').forEach(div => div.classList.add('hidden'));
            document.getElementById(group + '-wrapper').classList.remove('hidden');
        });
    });
});

function setupControls() {
    document.getElementById('entries-select').addEventListener('change', e => {
        entriesPerPage = parseInt(e.target.value);
        for (let key in pagination) pagination[key] = 1;
        renderAllGroups();
    });

    document.getElementById('search-input').addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase();
        for (let key in pagination) pagination[key] = 1;
        renderAllGroups();
    });
}

function renderAllGroups() {
    renderFretsByGroup('incomplets', fret =>
        fret.statut === 30 && fret.tournees_count < fret.nombrecamions
    );
    renderFretsByGroup('complets', fret =>
        fret.statut === 30 && fret.tournees_count >= fret.nombrecamions
    );
    renderFretsByGroup('statut40', fret => fret.statut === 40);
    renderFretsByGroup('statut50', fret => fret.statut === 50);
}

function renderFretsByGroup(groupKey, filterFn) {
    const tbody = document.getElementById(`${groupKey}-body`);
    const paginationContainer = document.getElementById(`${groupKey}-pagination`);
    tbody.innerHTML = '';

    let filtered = allFrets.filter(filterFn);

    if (searchQuery) {
        filtered = filtered.filter(f =>
            f.numerofret.toLowerCase().includes(searchQuery) ||
            f.numerodossier.toLowerCase().includes(searchQuery) ||
            f.lieuchargement.nom.toLowerCase().includes(searchQuery) ||
            f.lieudechargement.nom.toLowerCase().includes(searchQuery) ||
            f.typemarchandise.libelle.toLowerCase().includes(searchQuery) ||
            new Date(f.created_at).toLocaleString().includes(searchQuery) ||
            f.poidsmarchandise.toString().includes(searchQuery)
        );
    }

    const total = filtered.length;
    const currentPage = pagination[groupKey];
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentFrets = filtered.slice(start, end);

    if (currentFrets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center">Aucun fret trouvé.</td></tr>';
    } else {
        currentFrets.forEach((fret, index) => {
            const createdAt = new Date(fret.created_at);
            const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth() + 1).toString().padStart(2, '0')}/${createdAt.getFullYear()} à ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>${fret.numerofret}</td>
                <td>${fret.numerodossier}</td>
                <td>${fret.lieuchargement.nom}</td>
                <td>${fret.lieudechargement.nom}</td>
                <td>${fret.typemarchandise.libelle}</td>
                <td>${formattedDate}</td>
                <td>${fret.poidsmarchandise}</td>
                <td class="text-center">
                    <div class="flex justify-center gap-2">
                        <a href="/v1/espace/transporteur/frets/details/${fret.keyfret}" class="btn btn-sm btn-outline-info" title="Voir les détails">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                        </a>
                        <a href="/v1/espace/transporteur/tournees-fret/${fret.keyfret}" class="btn btn-sm btn-outline-success" title="Voir les tournées">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg>
                        </a>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderPaginationForGroup(groupKey, total);
}
// Pour la pagination
function renderPaginationForGroup(groupKey, total) {
    const totalPages = Math.ceil(total / entriesPerPage);
    const container = document.getElementById(`${groupKey}-pagination`);
    const currentPage = pagination[groupKey];
    container.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `px-3 py-1 rounded border ${i === currentPage ? 'bg-yellow-500 text-white' : 'bg-white'}`;
        btn.addEventListener('click', () => {
            pagination[groupKey] = i;
            renderFretsByGroup(groupKey, fret => {
                if (groupKey === 'incomplets') return fret.statut === 30 && fret.tournees_count < fret.nombrecamions;
                if (groupKey === 'complets') return fret.statut === 30 && fret.tournees_count >= fret.nombrecamions;
                if (groupKey === 'statut40') return fret.statut === 40;
                if (groupKey === 'statut50') return fret.statut === 50;
                return false;
            });
        });
        container.appendChild(btn);
    }
}
// Pour les tab onglets
document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-button').forEach(b => {
            b.classList.remove('bg-yellow-500', 'text-white');
            b.classList.add('bg-gray-100', 'text-gray-700');
        });
        btn.classList.add('bg-yellow-500', 'text-white');
        btn.classList.remove('bg-gray-100', 'text-gray-700');
    });
});
// Fin


// Affichage des détails d'un fret
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const container = document.getElementById('fretshow-container');

    if (!keyfret) {
        console.error("Clé de fret manquante.");
        return;
    }

    container.innerHTML = `
        <div class="text-center py-10 text-gray-600 animate-pulse">
            <p class="text-lg font-medium">Chargement des détails du fret...</p>
        </div>`;

    const response = await showFret(keyfret);
    if (!response || !response.fret) {
        container.innerHTML = '<p class="text-red-500 text-center mt-6">Erreur lors du chargement du fret.</p>';
        return;
    }

    const fret = response.fret;
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return isNaN(date) ? 'N/A' : `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-xl shadow-xl">
            <div class="bg-gray-50 p-4 rounded-lg border">
                <h2 class="text-lg font-semibold text-green-700 mb-4 border-b pb-2">Informations générales</h2>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li><strong>Numéro dossier :</strong> ${fret.numerodossier ?? 'N/A'}</li>
                    <li><strong>Chargement :</strong> ${fret.lieuchargement?.nom ?? 'N/A'} (${formatDate(fret.jourchargement)})</li>
                    <li><strong>Déchargement :</strong> ${fret.lieudechargement?.nom ?? 'N/A'} (${formatDate(fret.jourdechargement)})</li>
                    <li><strong>Marchandise :</strong> ${fret.naturemarchandise ?? 'N/A'} (${fret.poidsmarchandise ?? '?'} kg)</li>
                    <li><strong>Conteneurs :</strong> ${fret.nombreconteneurs ?? 'N/A'} / <strong>Camions :</strong> ${fret.nombrecamions ?? 'N/A'}</li>
                    <li><strong>Commentaire :</strong> <em>${fret.commentaire ?? 'Aucun'}</em></li>
                </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border">
                <h2 class="text-lg font-semibold text-green-700 mb-4 border-b pb-2">Marchandise & Véhicule</h2>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li><strong>Type marchandise :</strong> ${fret.typemarchandise?.libelle ?? 'N/A'}</li>
                    <li><strong>Type véhicule :</strong> ${fret.typevehicule?.libelle ?? 'N/A'}</li>
                    <li><strong>Température :</strong> ${fret.parametresvehicule?.temperaturemin ?? 'N/A'}°C - ${fret.parametresvehicule?.temeraturemax ?? 'N/A'}°C</li>
                    <li><strong>Dimensions (H×L×l) :</strong>
                        ${fret.parametresvehicule?.hauteurchargement ?? '?'}m ×
                        ${fret.parametresvehicule?.longueurchargement ?? '?'}m ×
                        ${fret.parametresvehicule?.largeurchargement ?? '?'}m
                    </li>
                    <li><strong>Isolation thermique :</strong> ${fret.parametresvehicule?.isolationthermique ? 'Oui' : 'Non'}</li>
                    <li><strong>Normes sanitaires :</strong> ${fret.parametresvehicule?.normesanitaire ?? 'N/A'}</li>
                    <li><strong>Chargement :</strong> ${fret.parametresvehicule?.modechargement ?? 'N/A'}</li>
                </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border md:col-span-2">
                <h2 class="text-lg font-semibold text-green-700 mb-4 border-b pb-2">Système & Capacité</h2>
                <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                    <li><strong>Refroidissement :</strong> ${fret.parametresvehicule?.systemerefroidissement ?? 'N/A'}</li>
                    <li><strong>Matériau citerne :</strong> ${fret.parametresvehicule?.materiauciterne ?? 'N/A'}</li>
                    <li><strong>Capacité :</strong> ${fret.parametresvehicule?.capacitelitre ?? 'N/A'} L / ${fret.parametresvehicule?.capacitepieds ?? 'N/A'} ft</li>
                    <li><strong>Réfrigéré :</strong> ${fret.parametresvehicule?.reefer ? 'Oui' : 'Non'}</li>
                    <li class="col-span-2"><strong>Autre paramètre :</strong> ${fret.parametresvehicule?.autreparametre ?? 'N/A'}</li>
                </ul>
            </div>
        </div>
    `;
});

// Pour le controle du bouton voir tournées de la page détails
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const { fret } = await showFret(keyfret);

    const btnVoirTournee = document.getElementById('btnVoirTournee');
    const btnVoirPropositions = document.getElementById('btnVoirPropositions');

    // Vérifie le statut du fret
    if (fret.statut === 20) {
        btnVoirTournee.style.display = 'none'; // Masque le bouton "Voir Tournée"
        btnVoirPropositions.style.display = 'block'; // Affiche le bouton "Voir Propositions"
    } else {
        btnVoirTournee.style.display = 'block'; // Affiche le bouton "Voir Tournée"
        btnVoirPropositions.style.display = 'none'; // Masque le bouton "Voir Propositions"
        btnVoirTournee.classList.remove('disabled', 'opacity-50', 'pointer-events-none');
        btnVoirTournee.removeAttribute('title'); // Retire l'attribut title si le fret est attribué
    }
});
