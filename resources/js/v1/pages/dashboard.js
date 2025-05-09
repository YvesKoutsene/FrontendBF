document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        window.location.href = '/v1/espace/transporteur/connexion';
        return;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const utilisateurData = localStorage.getItem('utilisateur');

    if (utilisateurData) {
        const utilisateur = JSON.parse(utilisateurData);

        const userInfoDiv = document.getElementById('user-info');

        if (userInfoDiv && utilisateur) {
            userInfoDiv.innerHTML = `
                <h4 class="text-base">
                    ${utilisateur.nom} ${utilisateur.prenom}
                    <span class="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">AT</span>
                </h4>
                <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                   href="javascript:;">${utilisateur.email}</a>
            `;
        }
    } else {
        window.location.href = '/v1/espace/transporteur/connexion';
    }
});
