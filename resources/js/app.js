import './bootstrap';
import { connexion } from './api/auth';
import { deconnexion } from './api/auth';
import { fetchFretsAttribues } from './api/frets';
//import { fetchTournees } from './api/tournees';
import { getRessourcesDisponibles } from './api/tournees';
import { store } from './api/tournees';
import { demarrerTournee } from './api/etapes';
import { cloturerTournee } from './api/etapes';
import { fetchEtapesTournee } from './api/etapes';
import { fetchTourneeEncours } from './api/tournees';

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

            window.location.href = '/';
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
function afficherFretsDansLeDOM(frets) {
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
                    <a href="" class="btn btn-sm btn-info" title="Voir les détails">
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
});

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
                }, 3000);
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
            <a href="" class="btn btn-sm btn-primary" title="Modifier tournée">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path
                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
            </a>
            <a href="" class="btn btn-sm btn-outline-danger" title="Supprimer cette tournee">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path
                        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
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
        // Formatage des dates
        const dateDepart = tournee.datedepart ? new Date(tournee.datedepart).toLocaleDateString('fr-FR') : '';
        const dateArrivee = tournee.datearrivee ? new Date(tournee.datearrivee).toLocaleDateString('fr-FR') : '';

        const html = `
            <div class="space-y-5 border-b pb-6 p-4 bg-gray-100 rounded-lg shadow-md">
                <h5 class="text-lg font-semibold dark:text-white-light text-center">Tournée #${index + 1}</h5>
                <input type="hidden" name="tournee_ids[]" value="${tournee.id}">

                <h5 class="text-lg font-semibold dark:text-white-light">Informations de la tournée</h5>
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
                        <input type="text" name="position[]" placeholder="Ex: Nukafu" class="form-input" required />
                    </div>
                    <div>
                        <label>Latitude<span class="text-danger">*</span></label>
                        <input type="text" name="latitude[]" placeholder="Ex: 6.12298" class="form-input" required />
                    </div>
                    <div>
                        <label>Longitude<span class="text-danger">*</span></label>
                        <input type="text" name="longitude[]" placeholder="Ex: 1.206709" class="form-input" required />
                    </div>
                </div>
                <small class="text-muted">
                    <span class="text-danger">NB: * Champs obligatoires pour ajouter une nouvelle étape</span>
                </small>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', html);
    });
});
