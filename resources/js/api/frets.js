import { API_BASE_URL } from './config.js';

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
        const response = await fetch(`${API_BASE_URL}/frets-attribues/${keytransporteur}`, {
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

        // On récupère la réponse en texte brut
        const text = await response.text();

        // Si la réponse est vide, on retourne un tableau vide
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

        // Retour des frets attribués si disponibles
        console.log("Frets attribués récupérés :", data.frets);
        return data.frets || [];

    } catch (error) {
        console.error("Erreur lors de la récupération des frets :", error);
        return [];
    }
}
