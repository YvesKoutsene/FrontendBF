import { API_BASE_URL } from './config.js';

// Pour la connexion
export async function connexion(email, motdepasse) {
    try {
        const response = await fetch(`${API_BASE_URL}/connexion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, motdepasse }),
        });

        if (!response.ok) {
            let errorMessage = 'Une erreur est survenue.';
            if (response.status === 401) {
                errorMessage = 'Email ou mot de passe incorrect.';
            } else if (response.status === 403) {
                const errorData = await response.json();
                errorMessage = errorData?.message || 'Compte inactif.';
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();

        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('utilisateur', JSON.stringify(data.user));

        return data;
    } catch (error) {
        throw error;
    }
}

// Pour la deconnexion
export async function deconnexion() {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Aucun token trouvé.');
        }

        const response = await fetch(`${API_BASE_URL}/deconnexion`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            let errorMessage = 'Une erreur est survenue.';
            if (response.status === 401) {
                errorMessage = 'Utilisateur non authentifié.';
            } else if (response.status === 403) {
                const errorData = await response.json();
                errorMessage = errorData?.message || 'Accès interdit.';
            }
            throw new Error(errorMessage);
        }

        localStorage.removeItem('auth_token');
        localStorage.removeItem('utilisateur');

        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
