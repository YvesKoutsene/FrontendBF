import { API_BASE_URL } from './config.js';

export async function demarrerTournee(keyTournee, params) {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.error('Token d’authentification manquant.');
        throw new Error('Non authentifié');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tournees-fret/demarrer/${keyTournee}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();

        if (!response.ok) {
            const message = data.message || 'Erreur inconnue.';
            throw {
                response: {
                    status: response.status,
                    data: data,
                    message: message
                }
            };
        }

        return data;
    } catch (error) {
        console.error('Erreur réseau ou serveur :', error);
        throw error;
    }
}
