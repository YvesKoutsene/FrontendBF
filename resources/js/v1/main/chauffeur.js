import { fetchChauffeurs } from '../api/chauffeurs';
import { showMessage } from '../pages/notif'

// Pour la récupération des chauffeurs du transporteur sur different onglets
// Début
let allChauffeurs = [];
let searchQuery = "";
let entriesPerPage = 10;
let pagination = {
    statutchauf10: 1,
    statutchauf20: 1,
    statutchauf30: 1
};

document.addEventListener('DOMContentLoaded', async () => {
    allChauffeurs = await  fetchChauffeurs();

    setupControls();
    renderAllGroups();

    // Gestion des onglets
    document.querySelectorAll('[data-statut]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-statut]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const group = tab.getAttribute('data-statut');
            document.querySelectorAll('.chauffeur-table-group').forEach(div => div.classList.add('hidden'));
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
    renderChauffeursByGroup('statutchauf10', chauffeur => chauffeur.statut === 10);
    renderChauffeursByGroup('statutchauf20', chauffeur => chauffeur.statut === 20);
    renderChauffeursByGroup('statutchauf30', chauffeur => chauffeur.statut === 30);
}

function renderChauffeursByGroup(groupKey, filterFn) {
    const tbody = document.getElementById(`${groupKey}-body`);
    const paginationContainer = document.getElementById(`${groupKey}-pagination`);
    tbody.innerHTML = '';

    let filtered = allChauffeurs.filter(filterFn);

    if (searchQuery) {
        filtered = filtered.filter(ch =>
            ch.nom.toLowerCase().includes(searchQuery) ||
            ch.prenom.toLowerCase().includes(searchQuery) ||
            new Date(ch.created_at).toLocaleString().includes(searchQuery)
        );
    }

    const total = filtered.length;
    const currentPage = pagination[groupKey];
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentChauffeurs = filtered.slice(start, end);

    if (currentChauffeurs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center">Aucun chauffeur trouvé.</td></tr>';
    } else {
        currentChauffeurs.forEach((chauffeur, index) => {
            const createdAt = new Date(chauffeur.created_at);
            const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth() + 1).toString().padStart(2, '0')}/${createdAt.getFullYear()} à ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${start + index + 1}</td>
                <td>${chauffeur.nom}</td>
                <td>${chauffeur.prenom}</td>
                <td>${formattedDate}</td>
                <td class="text-center">
                    <div class="flex justify-center gap-2">
                        <a href="" class="btn btn-sm btn-outline-info" title="Voir les détails">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
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
            renderChauffeursByGroup(groupKey, chauffeur => {
                if (groupKey === 'statutchauf10') return chauffeur.statut === 10;
                if (groupKey === 'statutchauf20') return chauffeur.statut === 20;
                if (groupKey === 'statutchauf30') return chauffeur.statut === 30;
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
