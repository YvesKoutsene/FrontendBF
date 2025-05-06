import './bootstrap';
import { connexion } from './api/auth';
import { deconnexion } from './api/auth';
import { fetchFretsAttribues } from './api/frets';
import { showFret } from './api/frets';
//import { fetchTournees } from './api/tournees';
import { getRessourcesDisponibles } from './api/tournees';
import { store } from './api/tournees';
import { demarrerTournee } from './api/etapes';
import { cloturerTournee } from './api/etapes';
import { fetchEtapesTournee } from './api/etapes';
import { fetchTourneeEncours } from './api/tournees';
import { storeEtapes } from './api/etapes';

// Pour la notification
function showMessage(msg = 'Notification.', position = 'top-end', type = 'success', duration = 5000) {
    const toast = window.Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: duration,
        timerProgressBar: true,
        showCloseButton: true,
        icon: type,
        customClass: {
            popup: 'animate__animated animate__slideInDown',
            title: 'text-sm',
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', window.Swal.stopTimer);
            toast.addEventListener('mouseleave', window.Swal.resumeTimer);
        },
        didClose: () => {
            toast.classList.add('animate__fadeOutUp');
        }
    });

    toast.fire({
        title: msg,
    });
}

// Pour la connexion
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const motdepasse = document.getElementById('motdepasse').value;

        try {
            const result = await connexion(email, motdepasse);

            sessionStorage.setItem('loginMessage', 'Content de te revoir!');

            window.location.href = '/espace/trans/frets';
        } catch (error) {
            showMessage(error.message || 'Erreur de connexion.', 'top-end', 'error');
        }
    });

    if (sessionStorage.getItem('loginMessage')) {
        const successMessage = sessionStorage.getItem('loginMessage');
        showMessage(successMessage, 'top-end', 'success');

        sessionStorage.removeItem('loginMessage');
    }
});

// Pour la deconnexion
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await deconnexion();
                sessionStorage.setItem('logoutMessage', 'Au revoir à bientôt!');
                window.location.href = '/espace/trans/connexion';
            } catch (error) {
                showMessage(error.message || 'Erreur lors de la déconnexion.', 'top-end', 'error');
            }
        });
    }
     if (sessionStorage.getItem('logoutMessage')) {
        const successMessage = sessionStorage.getItem('logoutMessage');
        showMessage(successMessage, 'top-end', 'success');
        sessionStorage.removeItem('logoutMessage');
     }
});

// Pour la récupération des frets
/*function afficherFretsDansLeDOM(frets) {
    const tbody = document.getElementById('frets-body');
    tbody.innerHTML = '';

    frets.forEach((fret, index) => {
        const row = document.createElement('tr');

        const createdAt = new Date(fret.created_at);
        const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth()+1).toString().padStart(2, '0')}/${createdAt.getFullYear()} à ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${fret.numerofret}</td>
            <td>${fret.numerodossier}</td>
            <td>${fret.lieuchargement.nom}</td>
            <td>${fret.lieudechargement.nom}</td>
            <td>${fret.typemarchandise.libelle}</td>
            <td>${formattedDate}</td>
            <td>${fret.poidsmarchandise}</td>
            <td class="text-center">
                <div class="flex justify-center gap-2">
                    <a href="/espace/trans/frets/details/${fret.keyfret}/${fret.numerodossier}" class="btn btn-sm btn-info" title="Voir les détails">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>
                    </a>
                    <a href="/espace/trans/tournees-fret/${fret.keyfret}" class="btn btn-sm btn-success" title="Voir les tournées">
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
document.addEventListener('DOMContentLoaded', async () => {
    const frets = await fetchFretsAttribues();
    afficherFretsDansLeDOM(frets);
});*/

// Début
let allFrets = [];
let currentStatut = 40;
let currentPage = 1;
let entriesPerPage = 10;
let searchQuery = "";
document.addEventListener('DOMContentLoaded', async () => {
    allFrets = await fetchFretsAttribues();

    setupControls();
    renderFrets();

    document.querySelectorAll('[data-statut]').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('[data-statut]').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentStatut = parseInt(tab.getAttribute('data-statut'));
            currentPage = 1;
            searchQuery = '';
            document.getElementById('search-input').value = '';
            renderFrets();
        });
    });
});
function setupControls() {
    document.getElementById('entries-select').addEventListener('change', e => {
        entriesPerPage = parseInt(e.target.value);
        currentPage = 1;
        renderFrets();
    });

    document.getElementById('search-input').addEventListener('input', e => {
        searchQuery = e.target.value.toLowerCase();
        currentPage = 1;
        renderFrets();
    });
}
function renderFrets() {
    const tbody = document.getElementById('frets-table-body');
    tbody.innerHTML = '';

    let filtered = allFrets.filter(fret => fret.statut === currentStatut);

    if (searchQuery) {
        filtered = filtered.filter(f =>
            f.numerofret.toLowerCase().includes(searchQuery) ||
            f.numerodossier.toLowerCase().includes(searchQuery) ||
            f.lieuchargement.nom.toLowerCase().includes(searchQuery) ||
            f.lieudechargement.nom.toLowerCase().includes(searchQuery) ||
            f.typemarchandise.libelle.toLowerCase().includes(searchQuery)
        );
    }

    const total = filtered.length;
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentFrets = filtered.slice(start, end);

    if (currentFrets.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="text-center">Aucun fret trouvé.</td></tr>';
    } else {
        currentFrets.forEach((fret, index) => {
            const createdAt = new Date(fret.created_at);
            const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth()+1).toString().padStart(2, '0')}/${createdAt.getFullYear()} à ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

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
                        <a href="/espace/trans/frets/details/${fret.keyfret}/${fret.numerofret}" class="btn btn-sm btn-outline-info" title="Voir les détails">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                        </a>
                        <a href="/espace/trans/tournees-fret/${fret.keyfret}" class="btn btn-sm btn-outline-success" title="Voir les tournées">
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

    renderPagination(total);
}
function renderPagination(total) {
    const totalPages = Math.ceil(total / entriesPerPage);
    const container = document.getElementById('pagination');
    container.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = `px-3 py-1 rounded border ${i === currentPage ? 'bg-yellow-500 text-white' : 'bg-white'}`;
        btn.addEventListener('click', () => {
            currentPage = i;
            renderFrets();
        });
        container.appendChild(btn);
    }
}
// Fin


// Pour la récupération des tournées d'un fret
/*function afficherTourneesDansLeDOM(tournees) {
    const tbody = document.getElementById('tournees-body');
    tbody.innerHTML = '';

    tournees.forEach((tournee, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${tournee.camion_actif.plaque1}/${tournee.camion_actif.plaque1}</td>
    <td>${tournee.chauffeur_actif.nom} ${tournee.chauffeur_actif.prenom}</td>
    <td>${tournee.poids}</td>
    <td>${tournee.numerobl}</td>
    <td>${tournee.lieu_depart.nom}</td>
    <td>${tournee.lieu_arrivee.nom}</td>
    <td>${tournee.derniere_etape.postion}</td>
    <td class="text-center">
        <div class="flex justify-center gap-2">
            <a href="" class="btn btn-sm btn-info" title="Voir les détails">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill"
                    viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
            </a>
            <a href="" class="btn btn-sm btn-success" title="Démarrer cette tournée">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path
                        d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path
                        d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
            </a>
        </div>
    </td>
    `;
        tbody.appendChild(row);
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    const tournees = await fetchTournees();
    afficherTourneesDansLeDOM(tournees);
});
*/

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

                setTimeout(() => {
                    form.reset();
                    window.location.reload();
                }, 2000);
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

// Pour démarrer une tournée
window.demarrerTournee = demarrerTournee;

// Pour clôturer une tournée
window.cloturerTournee = cloturerTournee;

// Pour la récupération des étapes d'une tournée
function afficherEtapesDansLeDOM(etapes) {
    const tbody = document.getElementById('etapes-body');
    tbody.innerHTML = '';

    etapes.forEach((etape, index) => {
    const row = document.createElement('tr');

    const createdAt = new Date(etape.dateposition);
    const formattedDate = `${createdAt.getDate().toString().padStart(2,
    '0')}/${(createdAt.getMonth()+1).toString().padStart(2, '0')}/${createdAt.getFullYear()} à
    ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${etape.position}</td>
    <td>${etape.latitude}</td>
    <td>${etape.longitude}</td>
    <td>${formattedDate}</td>
    <td class="text-center">
        <div class="flex justify-center gap-2">
            <a href="" class="btn btn-sm btn-outline-primary" title="Modifier tournée">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
            </a>
            <a href="" class="btn btn-sm btn-outline-danger" title="Supprimer cette tournee">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
            </a>
        </div>
    </td>
    `;
    tbody.appendChild(row);
    });
}
document.addEventListener('DOMContentLoaded', async () => {
    const etapes = await fetchEtapesTournee();
    afficherEtapesDansLeDOM(etapes);
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
                <h5 class="text-lg font-semibold dark:text-white-light text-center">Tournée #${index + 1}</h5>
                <input type="hidden" name="tournee_ids[]" value="${tournee.id}">

                <h5 class="text-lg font-semibold dark:text-white-light">Informations sur la tournée</h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            }, 2000);
        } else {
            showMessage(result.message || 'Erreur lors de l’enregistrement.', 'top-end', 'error');
        }
    });
});

// Affichage esthétique des détails d'un fret
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
                <h2 class="text-lg font-semibold text-indigo-700 mb-4 border-b pb-2">📦 Informations générales</h2>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li><strong>Numéro fret :</strong> ${fret.numerofret ?? 'N/A'}</li>
                    <li><strong>Numéro dossier :</strong> ${fret.numerodossier ?? 'N/A'}</li>
                    <li><strong>Chargement :</strong> ${fret.lieuchargement?.nom ?? 'N/A'} (${formatDate(fret.jourchargement)})</li>
                    <li><strong>Déchargement :</strong> ${fret.lieudechargement?.nom ?? 'N/A'} (${formatDate(fret.jourdechargement)})</li>
                    <li><strong>Marchandise :</strong> ${fret.naturemarchandise ?? 'N/A'} (${fret.poidsmarchandise ?? '?'} kg)</li>
                    <li><strong>Conteneurs :</strong> ${fret.nombreconteneurs ?? 'N/A'} / <strong>Camions :</strong> ${fret.nombrecamions ?? 'N/A'}</li>
                    <li><strong>Commentaire :</strong> <em>${fret.commentaire ?? 'Aucun'}</em></li>
                </ul>
            </div>

            <div class="bg-gray-50 p-4 rounded-lg border">
                <h2 class="text-lg font-semibold text-green-700 mb-4 border-b pb-2">🚚 Marchandise & Véhicule</h2>
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
                <h2 class="text-lg font-semibold text-blue-700 mb-4 border-b pb-2">🧊 Système & Capacité</h2>
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
