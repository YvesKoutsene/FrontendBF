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
        const response = await fetch(`${API_BASE_URL}/aft/frets-introduits`, {
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

        const response = await fetch(`${API_BASE_URL}/aft/frets-introduits/propositions-prix/${keyfret}`, {
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
export async function proposerPrixFret(keyfret, params) {
    const authToken = localStorage.getItem('auth_token');
    const utilisateurData = localStorage.getItem('utilisateur');
    const utilisateur = utilisateurData ? JSON.parse(utilisateurData) : null;
    const idtransporteur = utilisateur?.transporteur?.id;

    if (!authToken || !idtransporteur) {
        console.error('Token ou ID du transporteur manquant.');
        return { success: false, message: 'Authentification invalide ou transporteur introuvable.' };
    }

    const updatedParams = {
        ...params,
        idtransporteur: idtransporteur
    };

    try {
        const response = await fetch(`${API_BASE_URL}/aft/frets-introduits/propositions-prix/store/${keyfret}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedParams),
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
