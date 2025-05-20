import { API_BASE_URL } from './config.js';

// Fonction d'appel des frets introduits
export async function fetchFretsIntroduits() {
    try {
        const authToken = localStorage.getItem('auth_token');

        if (!authToken) {
            console.error('Token manquant.');
            return [];
        }

        // Appel à l'API pour récupérer les frets introduits
        const response = await fetch(`${API_BASE_URL}/frets-introduits`, {
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

        if (response.status === 204) {
            console.info("Aucun fret introduit.");
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

        console.log("Frets introduits récupérés :", data.frets);
        return data.frets || [];

    } catch (error) {
        console.error("Erreur lors de la récupération des frets :", error);
        return [];
    }
}

// Fonction d'affichage des propostions de prix d'un fret introduit
export async function fetchPropositionsFret($keyfret) {
    try {
        const authToken = localStorage.getItem('auth_token');

        if (!authToken) {
            console.error('Token manquant.');
            return { propositions: [] };
        }

        const response = await fetch(`${API_BASE_URL}/frets-introduits/propositions-prix/${keyfret}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authToken,
                'Accept': 'application/json',
            },
        });

        if (response.status === 401) {
            console.warn("Utilisateur non authentifié.");
            return { propositions: [] };
        }

        if (response.status === 204) {
            console.info("Aucune proposition trouvée.");
            return { propositions: [] };
        }

        const text = await response.text();

        if (!text) {
            console.warn("Réponse vide du serveur.");
            return { propositions: [] };
        }

        let data;
        try {
            data = JSON.parse(text);
        } catch (jsonError) {
            console.error("Erreur de parsing JSON :", jsonError);
            return { propositions: [] };
        }

        console.log("Propositions récupérées :", data.propositions);
        return {
            propositions : data.propositions || [],
        };

    } catch (error) {
        console.error("Erreur lors de la récupération des propositions:", error);
        return { propositions: [] };
    }
}

// Fonction pour proposer un prix à un fret

