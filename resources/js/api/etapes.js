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

// Fonction permettant d'afficher les étapes d'une tournée
export async function fetchEtapesTournee($keytournee) {
    try {
        const authToken = localStorage.getItem('auth_token');

        if (!authToken) {
            console.error('Token manquant.');
            return [];
        }

        // Appel à l'API pour récupérer les étapes du fret
        const response = await fetch(`${API_BASE_URL}/tournees-fret/etapes/${keytournee}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Accept': 'application/json',
            },
        });

        if (response.status === 401) {
            console.warn("Utilisateur non authentifié.");
            return [];
        }

        if (response.status === 404) {
            console.warn("Tournée non trouvée.");
            return [];
        }

        if (response.status === 204) {
            console.info("Aucune étape trouvée.");
            return [];
        }

        const text = await response.text();

        if (!text) {
            console.warn("Réponse vide du serveur.");
            return [];
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (jsonError) {
            console.error("Erreur de parsing JSON :", jsonError);
            return [];
        }

        console.log("Etapes récupérées :", data.etapes);
        //console.log("Tournée récupérée :", data.tournee);
        return data.etapes || [];

    } catch (error) {
        console.error("Erreur lors de la récupération des étapes :", error);
        return [];
    }
}

// Fonction permattant d'ajouter les étapes des tournées d'un fret

