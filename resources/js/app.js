import './bootstrap';
import { connexion } from './api/auth';
import { deconnexion } from './api/auth';
import { fetchFretsAttribues } from './api/frets';
//import { fetchTournees } from './api/tournees';
import { getRessourcesDisponibles } from './api/tournees';
import { store } from './api/tournees';

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

   // Remplir le select des chauffeurs
    const chauffeurSelect = document.querySelector('#chauffeurs-select');
    if (chauffeurSelect) {
        let hasChauffeurs = false; // Indicateur pour vérifier si des chauffeurs existent

        ressources.chauffeurs.forEach(chauffeur => {
            const option = document.createElement('option');
            option.value = chauffeur.id;

            // Vérifie si nom et prenom existent avant de les concaténer
            const nomPrenom = [];
            if (chauffeur.nom) {
                nomPrenom.push(chauffeur.nom);
            }
            if (chauffeur.prenom) {
                nomPrenom.push(chauffeur.prenom);
            }

            // Si nomPrenom n'est pas vide, on les rejoint pour l'affichage
            if (nomPrenom.length > 0) {
                option.textContent = nomPrenom.join(' ');
                chauffeurSelect.appendChild(option);
                hasChauffeurs = true; // On a trouvé au moins un chauffeur
            }
        });

        // Si aucun chauffeur n'est trouvé, afficher un message
        if (!hasChauffeurs) {
            const option = document.createElement('option');
            option.textContent = 'Aucun chauffeur disponible';
            option.disabled = true; // Option non sélectionnable
            chauffeurSelect.appendChild(option);
        }
    }

    // Remplir le select des camions
    const camionSelect = document.querySelector('#camions-select');
    if (camionSelect) {
        let hasCamions = false; // Indicateur pour vérifier si des camions existent

        ressources.camions.forEach(camion => {
            const option = document.createElement('option');
            option.value = camion.id;

            // Vérifie si plaque1 ou plaque2 existe avant de les concaténer
            const plaques = [];
            if (camion.plaque1) {
                plaques.push(camion.plaque1);
            }
            if (camion.plaque2) {
                plaques.push(camion.plaque2);
            }

            // Si plaques n'est pas vide, on les rejoint pour l'affichage
            if (plaques.length > 0) {
                option.textContent = plaques.join(' / ');
                camionSelect.appendChild(option);
                hasCamions = true; // On a trouvé au moins un camion
            }
        });

        // Si aucun camion n'est trouvé, afficher un message
        if (!hasCamions) {
            const option = document.createElement('option');
            option.textContent = 'Aucun camion disponible';
            option.disabled = true; // Option non sélectionnable
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
