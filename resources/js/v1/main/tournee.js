import { getRessourcesDisponibles } from '../api/tournees';
import { store } from '../api/tournees';
import { fetchTourneeEncours } from '../api/tournees';
import { fetchTournees } from '../api/tournees';
import { showMessage } from '../pages/notif';

// Pour la récupération des tournées d'un fret
// --- Configuration ---
let allTournees = [];
let searchQuery = "";
let entriesPerPage = 10;
let pagination = {
    statut10: 1,
    statut20: 1,
    statut30: 1
};
// --- Initialisation principale ---
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const container = document.getElementById('tournees-container');

    if (!keyfret) {
        console.error("Clé de fret manquante.");
        return;
    }

    allTournees = await fetchTournees(keyfret);
    allTournees = allTournees.tournees || [];

    setupControls();
    setupTabs();
    renderAllGroups();
});
// --- Configuration des contrôles (pagination + recherche) ---
function setupControls() {
    document.getElementById('entries-select')?.addEventListener('change', e => {
        entriesPerPage = parseInt(e.target.value);
        resetPagination();
        renderAllGroups();
    });

    document.getElementById('search-input')?.addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase();
        resetPagination();
        renderAllGroups();
    });
}

function resetPagination() {
    for (let key in pagination) pagination[key] = 1;
}
// --- Gestion des onglets ---
function setupTabs() {
    document.querySelectorAll('[data-statut]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-statut]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const group = tab.getAttribute('data-statut');
            document.querySelectorAll('.tournee-table-group').forEach(div => div.classList.add('hidden'));
            document.getElementById(group + '-wrapper')?.classList.remove('hidden');
        });
    });

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
}
// --- Rendu de toutes les sections (statuts) ---
function renderAllGroups() {
    renderTourneesByGroup('statut10', tournee => tournee.statut === 10);
    renderTourneesByGroup('statut20', tournee => tournee.statut === 20);
    renderTourneesByGroup('statut30', tournee => tournee.statut === 30);
}
// --- Rendu d'une section spécifique ---
function renderTourneesByGroup(groupKey, filterFn) {
    const tbody = document.getElementById(`${groupKey}-body`);
    const paginationContainer = document.getElementById(`${groupKey}-pagination`);
    if (!tbody || !paginationContainer) return;

    tbody.innerHTML = '';

    let filtered = allTournees.filter(filterFn);

    // Recherche
    if (searchQuery) {
        filtered = filtered.filter(t =>
            t.numerotournee?.toLowerCase().includes(searchQuery) ||
            (t.camion_actif.length > 0 &&
                (t.camion_actif[0]?.plaque1?.toLowerCase().includes(searchQuery) ||
                 t.camion_actif[0]?.plaque2?.toLowerCase().includes(searchQuery)) ) ||
            (t.chauffeur_actif.length > 0 &&
                (t.chauffeur_actif[0]?.nom?.toLowerCase().includes(searchQuery) ||
                 t.chauffeur_actif[0]?.prenom?.toLowerCase().includes(searchQuery)) ) ||
            t.poids?.toString().includes(searchQuery) ||
            new Date(t.created_at).toLocaleString().includes(searchQuery) ||
            new Date(t.updated_at).toLocaleString().includes(searchQuery) ||
            new Date(t.datedepart).toLocaleString().includes(searchQuery) ||
            new Date(t.datearrivee).toLocaleString().includes(searchQuery) ||
            t.derniere_etape?.position?.toLowerCase().includes(searchQuery)
        );
    }

    // Pagination
    const total = filtered.length;
    const currentPage = pagination[groupKey];
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentTournees = filtered.slice(start, end);

    // Aucune donnée
    if (currentTournees.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" class="text-center">Aucune tournée trouvée.</td></tr>';
        renderPaginationForGroup(groupKey, total);
        return;
    }

    // Formatage des dates
    const formatDate = dateStr => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()} à ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    };

    const formatDate2 = dateStr => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    };

    // Affichage personnalisé selon le groupe
    currentTournees.forEach((tournee, index) => {
        const row = document.createElement('tr');

        let commonCols = `
            <td>${start + index + 1}</td>
            <td>${tournee.numerotournee|| ''}</td>
            <td>${tournee.camion_actif[0]?.plaque1 || ''}/${tournee.camion_actif[0]?.plaque2 || ''}</td>
            <td>${tournee.chauffeur_actif[0]?.nom || ''} ${tournee.chauffeur_actif[0]?.prenom || ''}</td>
        `;

        let specificCols = '';
        if (groupKey === 'statut10') {
            specificCols = `
                <td>${tournee.poids || ''}</td>
                <td>${tournee.datedepart ? formatDate2(tournee.datedepart) : ''}</td>
                <td>${tournee.datearrivee ? formatDate2(tournee.datearrivee) : ''}</td>
                <td>${formatDate(tournee.created_at)}</td>
                <td class="text-center">
                    <div class="flex justify-center gap-2">
                        <a href="" class="btn btn-sm btn-outline-info" title="Voir les détails">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                            </svg>
                        </a>
                        <a href="" class="btn btn-sm btn-outline-primary" title="Modifier cette tournée">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </a>
                        <button type="button" class="btn btn-sm btn-outline-success" onclick="showAlertStart('${tournee.keytournee}')" title="Démarrer cette tournée">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                            </svg>
                        </button>
                        <a href="" class="btn btn-sm btn-outline-danger" title="Supprimer cette tournee">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </a>
                    </div>
                </td>
            `;
        } else if (groupKey === 'statut20') {
            specificCols = `
                <td>${tournee.poids || ''}</td>
                <td>${tournee.datedepart ? formatDate2(tournee.datedepart) : ''}</td>
                <td>${tournee.datearrivee ? formatDate2(tournee.datearrivee) : ''}</td>
                <td>${formatDate(tournee.updated_at)}</td>
                <td>${tournee.derniere_etape?.position || ''}</td>
                <td class="text-center">
                    <div class="flex justify-center gap-2">
                        <a href="" class="btn btn-sm btn-outline-info" title="Voir les détails">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                            </svg>
                        </a>
                        <a href="" class="btn btn-sm btn-outline-primary" title="Modifier cette tournée">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </a>
                        <a href="/v1/espace/transporteur/tournees-fret/etapes/index/${tournee.keytournee}" class="btn btn-sm btn-outline-warning" title="Voir les étapes">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
                                <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0M2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </a>
                        <button type="button" class="btn btn-sm btn-outline-danger"  onclick="showAlertEnd('${tournee.keytournee}')" title="Clôturer cette tournée">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                        </button>
                    </div>
                </td>
            `;
        } else if (groupKey === 'statut30') {
            specificCols = `
                <td>${tournee.poids || ''}</td>
                <td>${tournee.datedepart ? formatDate2(tournee.datedepart) : ''}</td>
                <td>${tournee.datearrivee ? formatDate2(tournee.datearrivee) : ''}</td>
                <td>${formatDate(tournee.updated_at)}</td>
                <td>${tournee.derniere_etape?.position || ''}</td>
                <td class="text-center">
                    <div class="flex justify-center gap-2">
                        <a href="" class="btn btn-sm btn-outline-info" title="Voir les détails">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                            </svg>
                        </a>
                        <a href="/v1/espace/transporteur/tournees-fret/etapes/index/${tournee.keytournee}" class="btn btn-sm btn-outline-warning" title="Voir les étapes">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
                                <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0M2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </a>
                        <a href="" class="btn btn-sm btn-outline-danger" title="Supprimer cette tournee">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                            </svg>
                        </a>
                    </div>
                </td>
            `;
        }

        row.innerHTML = commonCols + specificCols;
        tbody.appendChild(row);
    });

    renderPaginationForGroup(groupKey, total);
}
// --- Rendu de la pagination ---
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
            renderTourneesByGroup(groupKey, tournee => tournee.statut === parseInt(groupKey.replace('statut', '')));
        });
        container.appendChild(btn);
    }
}
//Fin


// Pour la récupération des chauffeurs et camions disponibles
document.addEventListener('DOMContentLoaded', async () => {
    const ressources = await getRessourcesDisponibles();

    if (!ressources || !ressources.chauffeurs || !ressources.camions) {
        console.error("Données de ressources indisponibles.");
        return;
    }

    const chauffeurSelect = document.querySelector('#chauffeurs-select');
    if (chauffeurSelect) {
        let hasChauffeurs = false;

        ressources.chauffeurs.forEach(chauffeur => {
            const option = document.createElement('option');
            option.value = chauffeur.id;

            const nomPrenom = [];
            if (chauffeur.nom) {
                nomPrenom.push(chauffeur.nom);
            }
            if (chauffeur.prenom) {
                nomPrenom.push(chauffeur.prenom);
            }

            if (nomPrenom.length > 0) {
                option.textContent = nomPrenom.join(' ');
                chauffeurSelect.appendChild(option);
                hasChauffeurs = true;
            }
        });

        if (!hasChauffeurs) {
            const option = document.createElement('option');
            option.textContent = 'Aucun chauffeur disponible';
            option.disabled = true;
            chauffeurSelect.appendChild(option);
        }
    }

    const camionSelect = document.querySelector('#camions-select');
    if (camionSelect) {
        let hasCamions = false;

        ressources.camions.forEach(camion => {
            const option = document.createElement('option');
            option.value = camion.id;

            const plaques = [];
            if (camion.plaque1) {
                plaques.push(camion.plaque1);
            }
            if (camion.plaque2) {
                plaques.push(camion.plaque2);
            }

            if (plaques.length > 0) {
                option.textContent = plaques.join(' / ');
                camionSelect.appendChild(option);
                hasCamions = true;
            }
        });

        if (!hasCamions) {
            const option = document.createElement('option');
            option.textContent = 'Aucun camion disponible';
            option.disabled = true;
            camionSelect.appendChild(option);
        }
    }

});

// Pour l'enrégistrement d'une tournée
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tournee-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fretKey = form.querySelector('input[name="keyfret"]').value;

            const params = {
                idlieudepart: form.querySelector('input[name="idlieudepart"]').value,
                idlieuarrivee: form.querySelector('input[name="idlieuarrivée"]').value,
                idchauffeur: form.querySelector('#chauffeurs-select').value,
                idcamion: form.querySelector('#camions-select').value,
                datedepart: form.querySelectorAll('input[type="date"]')[0].value,
                datearrivee: form.querySelectorAll('input[type="date"]')[1].value,
                poids: form.querySelector('#poids').value,
                numerobl: form.querySelector('input[name="numerobl"]').value,
                numeroconteneur: form.querySelector('input[name="numeroconteneur"]').value,
            };

            try {
                const response = await store(fretKey, params);
                showMessage('Tournée enregistrée avec succès.', 'top-end', 'success');

                const total = response.tournees_total;
                const limite = response.limite;

                setTimeout(() => {
                    form.reset();

                    if (total >= limite) {
                        window.location.href = `/v1/espace/transporteur/tournees-fret/${response.keyfret}`;
                    } else {
                        window.location.reload();
                    }
                }, 1500);

            } catch (error) {
                let messageErreur = 'Une erreur est survenue lors de l’enregistrement.';

                if (error.response && error.response.data && error.response.data.message) {
                    messageErreur = error.response.data.message;
                }

                showMessage(messageErreur, 'top-end', 'error');
            }

        });
    }
});

// Pour la récupération des tournées en cours d'un fret
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const container = document.getElementById('tournees-container');

    if (!keyfret) {
        console.error("Clé de fret manquante.");
        return;
    }

    const tournees = await fetchTourneeEncours(keyfret);

    tournees.forEach((tournee, index) => {
        const dateDepart = tournee.datedepart ? new Date(tournee.datedepart).toLocaleDateString('fr-FR') : '';
        const dateArrivee = tournee.datearrivee ? new Date(tournee.datearrivee).toLocaleDateString('fr-FR') : '';

        const html = `
            <div class="space-y-5 border-b pb-6 p-4 bg-white rounded-xl shadow-xl">
                <h5 class="text-lg font-semibold dark:text-white-light text-center">Tournée num. ${tournee.numerotournee}</h5>
                <input type="hidden" name="tournee_ids[]" value="${tournee.id}">

                <h5 class="text-lg font-semibold dark:text-white-light">Informations sur la tournée</h5>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label>Départ prévue</label>
                        <input type="text" class="form-input disabled:pointer-events-none" value="${dateDepart}" readonly />
                        <input type="hidden" name="datedepart[]" value="${tournee.datedepart ?? ''}" />
                    </div>
                    <div>
                        <label>Arrivée prévue</label>
                        <input type="text" class="form-input disabled:pointer-events-none" value="${dateArrivee}" readonly />
                        <input type="hidden" name="datearrivee[]" value="${tournee.datearrivee ?? ''}" />
                    </div>
                    <div>
                        <label>Poids du chargement</label>
                        <div class="flex">
                            <div class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                Kg
                            </div>
                            <input type="text" class="form-input disabled:pointer-events-none" value="${tournee.poids ?? ''}" readonly />
                            <input type="hidden" name="poids[]" value="${tournee.poids ?? ''}" />
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label>Camion</label>
                        <input type="text" class="form-input disabled:pointer-events-none" value="${tournee.camion_actif[0]?.plaque1 || ''}/${tournee.camion_actif[0]?.plaque2 || ''}" readonly />
                        <input type="hidden" name="camion_actif[]" value="${tournee.camion_actif[0]?.id || ''}" />
                    </div>
                    <div>
                        <label>Chauffeur</label>
                        <input type="text" class="form-input disabled:pointer-events-none" value="${tournee.chauffeur_actif[0]?.nom || ''} ${tournee.chauffeur_actif[0]?.prenom || ''}" readonly />
                        <input type="hidden" name="chauffeur_actif[]" value="${tournee.chauffeur_actif[0]?.id|| ''}" />
                    </div>
                 <div>
                        <label>Position actuelle</label>
                        <input type="text" class="form-input disabled:pointer-events-none" value="${tournee.derniere_etape.position ?? ''}" readonly />
                        <input type="hidden" name="etape[]" value="${tournee.derniere_etape.position ?? ''}" />
                    </div>
                </div>
                <h5 class="text-lg font-semibold dark:text-white-light">Nouvelle étape</h5>
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div class="md:col-span-2">
                        <label>Position<span class="text-danger">*</span></label>
                        <input type="text" name="position[]" placeholder="Ex: Nukafu" class="form-input"/>
                    </div>
                    <div>
                        <label>Latitude<span class="text-danger">*</span></label>
                        <input type="text" name="latitude[]" placeholder="Ex: 6.12298" class="form-input"/>
                    </div>
                    <div>
                        <label>Longitude<span class="text-danger">*</span></label>
                        <input type="text" name="longitude[]" placeholder="Ex: 1.206709" class="form-input" />
                    </div>
                </div>

            </div>
        `;

        container.insertAdjacentHTML('beforeend', html);
    });
});

// Pour afficher quelques informations utiles du fret
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const titreFret = document.getElementById('titreFret');

    const { fret, tournees } = await fetchTournees(keyfret);

    if (fret) {
        const nombreTournees = tournees.length;

        titreFret.innerHTML = `Tournées créées pour le fret num. ${fret.numerofret} : ${nombreTournees} / ${fret.nombrecamions}`;
        document.getElementById('lieuChargementNom').value = fret.lieuchargement?.nom ?? 'Inconnu';
        document.getElementById('lieuChargementId').value = fret.lieuchargement?.id ?? '';

        document.getElementById('lieuDechargementNom').value = fret.lieudechargement?.nom ?? 'Inconnu';
        document.getElementById('lieuDechargementId').value = fret.lieudechargement?.id ?? '';
    } else {
        titreFret.innerHTML = '<span class="text-red-500">(Fret introuvable)</span>';
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const numeroFret = document.getElementById('numeroFret');

    const { fret } = await fetchTournees(keyfret);

    if (fret) {
        numeroFret.innerHTML = `Détails du fret num. ${fret.numerofret}`;
    } else {
        numeroFret.innerHTML = '<span class="text-red-500">(Fret introuvable)</span>';
    }
});

// Pour le controle des deux boutons (Créer une tournée et ajouter les étapes)
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const { fret, tournees } = await fetchTournees(keyfret);

    const btnCreerTournee = document.getElementById('btnCreerTournee');
    const btnAjouterEtape = document.getElementById('btnAjouterEtape');

    const nombreTournees = tournees.length;
    const nombreTourneesEnCours = tournees.filter(t => t.statut === 20).length;
    const nombreCamions = fret?.nombrecamions ?? 0;

    if (nombreTournees >= nombreCamions) {
        btnCreerTournee.classList.add('disabled', 'opacity-50', 'pointer-events-none');
        btnCreerTournee.setAttribute('title', 'Toutes les tournées ont déjà été créées.');
    }

    if (nombreTournees === 0 || nombreTourneesEnCours === 0) {
        btnAjouterEtape.classList.add('disabled', 'opacity-50', 'pointer-events-none');
        btnAjouterEtape.setAttribute('title', 'Aucune tournée en cours disponible.');
    }
});

