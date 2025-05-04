import { API_BASE_URL } from './config.js';

// Fonction d'appel des tournées des frets du transporteur connacté
/*export async function fetchTournees() {
    try {
        const authToken = localStorage.getItem('auth_token');

        if (!authToken) {
            console.error('Token manquant.');
            return [];
        }

        // Appel à l'API pour récupérer les tournées du fret
        const response = await fetch(`${API_BASE_URL}/tournees-fret/${keyfret}`, {
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

        // Retour des tournées du fret si disponibles
        console.log("Tournées récupérées :", data.tournees);
        return data.tournees || [];

    } catch (error) {
        console.error("Erreur lors de la récupération des tournées:", error);
        return [];
    }
}
*/

// Fonction d'appel des chauffeurs et camions libres du transporteur connecté
export async function getRessourcesDisponibles() {
    const utilisateurData = localStorage.getItem('utilisateur');
    const utilisateur = utilisateurData ? JSON.parse(utilisateurData) : null;
    const keytransporteur = utilisateur?.transporteur?.keytransporteur;

    const authToken = localStorage.getItem('auth_token');

    if (!authToken || !keytransporteur) {
        console.error('Token ou clé du transporteur manquant.');
        return [];
    }

    try {
        const response = await fetch(`${API_BASE_URL}/disponibilites/${keytransporteur}`, {
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

// Fonction d'enregistrement d'une tournée d'un fret
export async function store(fretKey, params) {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.error('Token d’authentification manquant.');
        throw new Error('Non authentifié');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tournees-fret/store/${fretKey}`, {
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

// Fonction pour ramener les tournées en cours d'un fret pour l'ajout des étapes
export async function fetchTourneeEncours(keyfret) {
    try {
        const authToken = localStorage.getItem('auth_token');

        if (!authToken) {
            console.error('Token manquant.');
            return [];
        }

        // Appel à l'API pour récupérer les tournées en cours du fret
        const response = await fetch(`${API_BASE_URL}/tournees-fret/en-cours/${keyfret}`, {
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
            console.warn("Fret non trouvé.");
            return [];
        }

        if (response.status === 204) {
            console.info("Aucune tournée en cours trouvée.");
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

        console.log("Tournées en cours récupérées :", data.tournees);
        return data.tournees || [];

    } catch (error) {
        console.error("Erreur lors de la récupération des tourn :", error);
        return [];
    }
}

