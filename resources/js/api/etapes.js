import { API_BASE_URL } from './config.js';

// Fonction permettant de démarrer une tournée
export async function demarrerTournee(keytournee, params) {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.error('Token d’authentification manquant.');
        throw new Error('Non authentifié');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tournees-fret/demarrer/${keytournee}`, {
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

// Fonction permettant de clôturer une tournée
export async function cloturerTournee(keytournee, params) {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.error('Token d’authentification manquant.');
        throw new Error('Non authentifié');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tournees-fret/cloturer/${keytournee}`, {
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

// Fonction permattant d'ajouter les étapes des tournées d'un fret

// Fonction permettant de voir les étapes d'une tournée

