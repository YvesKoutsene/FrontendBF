import { fetchFretsIntroduits } from '../api/fretintroduits';
import { fetchPropositionsFret } from '../api/fretintroduits';
import { proposerPrixFret } from '../api/fretintroduits';
import { showMessage } from '../pages/notif';
import { showFret } from '../api/frets';

// Pour la récupération des frets introduits sur different onglets
// Début
let allFrets = [];
let searchQuery = "";
let entriesPerPage = 10;
let pagination = {
    isdemande10: 1,
    isdemande20: 1,
};

document.addEventListener('DOMContentLoaded', async () => {
    allFrets = await fetchFretsIntroduits();

    setupControls();
    renderAllGroups();

    // Gestion des onglets
    document.querySelectorAll('[data-isdemande]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-isdemande]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const group = tab.getAttribute('data-isdemande');
            document.querySelectorAll('.fret-introduit-table-group').forEach(div => div.classList.add('hidden'));
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
    renderFretsByGroup('isdemande10', fret => fret.isdemande === 10);
    renderFretsByGroup('isdemande20', fret => fret.isdemande === 20);
}

function renderFretsByGroup(groupKey, filterFn) {
    const tbody = document.getElementById(`${groupKey}-body`);
    const paginationContainer = document.getElementById(`${groupKey}-pagination`);
    tbody.innerHTML = '';

    let filtered = allFrets.filter(filterFn);

    if (searchQuery) {
        filtered = filtered.filter(f =>
            (f.numerofret || '').toLowerCase().includes(searchQuery) ||
            (f.numerodossier || '').toLowerCase().includes(searchQuery) ||
            ((f.lieuchargement && f.lieuchargement.nom) || '').toLowerCase().includes(searchQuery) ||
            ((f.lieudechargement && f.lieudechargement.nom) || '').toLowerCase().includes(searchQuery) ||
            ((f.typemarchandise && f.typemarchandise.libelle) || '').toLowerCase().includes(searchQuery) ||
            (new Date(f.created_at).toLocaleString().toLowerCase().includes(searchQuery)) ||
            (f.poidsmarchandise !== null && f.poidsmarchandise.toString().includes(searchQuery))
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
                        <a href="/v1/espace/transporteur/frets/introduits/details/${fret.keyfret}" class="btn btn-sm btn-outline-info" title="Voir les détails">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                        </a>
                        <a href="/v1/espace/transporteur/frets/introduits/propostions-prix/${fret.keyfret}" class="btn btn-sm btn-outline-success" title="Voir les propositions">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                              <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z"/>
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                              <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
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
                if (groupKey === 'isdemande10') return fret.isdemande === 10;
                if (groupKey === 'isdemande20') return fret.isdemande === 20;
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

// Pour afficher les propositions de prix d'un fret introduit
// Debut
let allPropositions = [];
    //let searchQuery = "";
    //let entriesPerPage = 10;
let currentPage = 1;

document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    if (!keyfret) {
        console.error("Clé de fret manquante.");
        return;
    }

    const response = await fetchPropositionsFret(keyfret);
    allPropositions = response?.propositions || [];

    afficherPropositionsDansLeDOM(allPropositions);

    document.getElementById('search-input').addEventListener('input', e => {
        searchQuery = e.target.value;
        currentPage = 1;
        afficherPropositionsDansLeDOM(allPropositions);
    });

    document.getElementById('entries-select').addEventListener('change', e => {
        entriesPerPage = parseInt(e.target.value);
        currentPage = 1;
        afficherPropositionsDansLeDOM(allPropositions);
    });
});

// Affichage des propositions
function afficherPropositionsDansLeDOM(propositions) {
    const tbody = document.getElementById('propositions-body');
    tbody.innerHTML = '';

    const getStatutLabel = (statut) => {
        switch (statut) {
            case 0: return 'envoyée';
            case 1: return 'acceptée';
            case 2: return 'rejetée';
            default: return '';
        }
    };

    const filteredPropositions = propositions.filter(proposition => {
        const statutLabel = getStatutLabel(proposition.statut);
        return (
            proposition.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proposition.prix?.toString().includes(searchQuery) ||
            proposition.commentaire?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            statutLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            new Date(proposition.created_at).toLocaleString().includes(searchQuery)
        );
    });

    const total = filteredPropositions.length;

    if (total === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">Aucune proposition trouvée.</td></tr>';
        document.getElementById('pagination-container').innerHTML = '';
        return;
    }

    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentPropositions = filteredPropositions.slice(start, end);

    currentPropositions.forEach((proposition, index) => {
        const createdAt = new Date(proposition.created_at);
        const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth() + 1).toString().padStart(2, '0')}/${createdAt.getFullYear()} à ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${Number(proposition.prix).toLocaleString('fr-FR')}</td>
            <td>${proposition.commentaire || 'N/A'}</td>
            <td>${getStatutBadge(proposition.statut)}</td>
            <td>${formattedDate}</td>
            <td class="text-center">
                <div class="flex justify-center gap-2">
                    ${proposition.statut === 2 ? `
                       <a href="javascript:void(0)" class="btn btn-sm btn-outline-info" title="Voir motif refus" onclick="voirRaisonRefus(this)"
                           data-raisonrefus="${proposition.raisonrefus || 'Aucune raison précisée'}">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chat-dots" viewBox="0 0 16 16">
                             <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2
                                      1 1 0 0 0 0 2"/>
                             <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0
                                      8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524
                                      2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1
                                      1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7
                                      6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
                           </svg>
                       </a>
                        <a href="" class="btn btn-sm btn-outline-danger" title="Supprimer cette proposition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </a>
                    ` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });

    renderPagination(total);
}

// Pagination dynamique
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
                afficherPropositionsDansLeDOM(allPropositions);
            };
            paginationContainer.appendChild(btn);
        }
    }
}
function getStatutBadge(statut) {
    let label = '';
    let colorClass = '';

    switch (statut) {
        case 0:
            label = 'Envoyée';
            colorClass = 'bg-yellow-100 text-yellow-800';
            break;
        case 1:
            label = 'Acceptée';
            colorClass = 'bg-green-100 text-green-800';
            break;
        case 2:
            label = 'Rejetée';
            colorClass = 'bg-red-100 text-red-800';
            break;
        default:
            label = 'Inconnu';
            colorClass = 'bg-gray-100 text-gray-800';
    }

    return `<span class="text-xs font-medium px-2 py-1 rounded ${colorClass}">${label}</span>`;
}
// Fin

// Pour l'affichage du titre propositions du fret
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const numero1Fret = document.getElementById('numero1Fret');

    const { fret } = await showFret(keyfret);

    if (fret) {
        numero1Fret.innerHTML = `Propositions de prix du fret num. ${fret.numerofret}`;
    } else {
        numero1Fret.innerHTML = '<span class="text-red-500">(Fret introuvable)</span>';
    }
});

// Pour faire une proposition de prix
window.proposerPrixFret = proposerPrixFret;

// Pour l'affichage du bouton proposition prix
document.addEventListener('DOMContentLoaded', async () => {
    const keyfret = window.keyfret;
    const { propositions } = await fetchPropositionsFret(keyfret);

    const btnFaireProposition = document.getElementById('btnFaireProposition');

    const propositionStatut0ou1 = propositions.some(proposition =>
        proposition.statut === 0 || proposition.statut === 1
    );

    if (!propositionStatut0ou1) {
        btnFaireProposition.classList.remove('disabled', 'opacity-50', 'pointer-events-none');
        btnFaireProposition.removeAttribute('title'); // Supprimer le titre
    }
});
