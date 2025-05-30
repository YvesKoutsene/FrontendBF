import { connexion } from '../api/auths';
import { deconnexion } from '../api/auths';
import { showMessage } from '../pages/notif';

// Pour la connexion
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const loginSpinner = document.getElementById('login-spinner');
    const loginBtnText = document.getElementById('login-btn-text');

    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const motdepasse = document.getElementById('motdepasse').value;

        loginBtn.disabled = true;
        loginSpinner.classList.remove('hidden');
        loginBtnText.textContent = 'Connexion...';

        try {
            const result = await connexion(email, motdepasse);

            sessionStorage.setItem('loginMessage', 'Content de vous revoir!');
            window.location.href = '/v1/espace/transporteur/frets';

        } catch (error) {
            showMessage(error.message || 'Erreur de connexion.', 'top-end', 'error');
        } finally {
            loginBtn.disabled = false;
            loginSpinner.classList.add('hidden');
            loginBtnText.textContent = 'Se connecter';
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
                window.location.href = '/v1/espace/transporteur/connexion';
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
