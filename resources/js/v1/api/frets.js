import { API_BASE_URL } from './config.js';

// Fonction d'appel des frets attribués au transporteur connecté
export async function fetchFretsAttribues() {
    try {
        const utilisateurData = localStorage.getItem('utilisateur');
        const utilisateur = utilisateurData ? JSON.parse(utilisateurData) : null;
        const keytransporteur = utilisateur?.transporteur?.keytransporteur;

        const authToken = localStorage.getItem('auth_token');

        if (!authToken || !keytransporteur) {
            console.error('Token ou clé du transporteur manquant.');
            return [];
        }

        // Appel à l'API pour récupérer les frets attribués
        const response = await fetch(`${API_BASE_URL}/trans/frets-attribues/${keytransporteur}`, {
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
            console.warn("Transporteur non trouvé.");
            return [];
        }

        if (response.status === 204) {
            console.info("Aucun fret attribué.");
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

        console.log("Frets attribués récupérés :", data.frets);
        return data.frets || [];

    } catch (error) {
        console.error("Erreur lors de la récupération des frets :", error);
        return [];
    }
}

// Fonction pour afficher les détails d'un fret
export async function showFret($keyfret) {

    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.error('Token manquant.');
        return [];
    }

    try {
        const response = await fetch(`${API_BASE_URL}/trans/frets-attribues/show/${keyfret}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Erreur lors de la récupération des ressources :', response.status);
            return [];
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de l’appel API :', error);
        return [];
    }
}
