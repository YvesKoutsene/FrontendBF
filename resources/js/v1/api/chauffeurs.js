import { API_BASE_URL } from './config.js';

// Fonction d'appel des chauffeurs du transporteur connecté
export async function fetchChauffeurs() {
    try {
        const utilisateurData = localStorage.getItem('utilisateur');
        const utilisateur = utilisateurData ? JSON.parse(utilisateurData) : null;
        const keytransporteur = utilisateur?.transporteur?.keytransporteur;

        const authToken = localStorage.getItem('auth_token');

        if (!authToken || !keytransporteur) {
            console.error('Token ou clé du transporteur manquant.');
            return [];
        }

        // Appel à l'API pour récupérer les chauffeurs du transporteur
        const response = await fetch(`${API_BASE_URL}/mes-chauffeurs/${keytransporteur}`, {
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
            console.info("Aucun chauffeur trouvé.");
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

        console.log("Chauffeur du transporteur récupérés :", data.chauffeurs);
        return data.chauffeurs || [];

    } catch (error) {
        console.error("Erreur lors de la récupération des chauffeurs du transporteur :", error);
        return [];
    }
}
