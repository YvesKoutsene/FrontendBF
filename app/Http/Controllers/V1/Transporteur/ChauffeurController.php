<?php

namespace App\Http\Controllers\V1\Transporteur;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChauffeurController extends Controller
{
    // Fonction de renvoyer la page de la liste des chauffeurs
    public function index(){
        return view('v1.transporteur.page.chauffeur.index');
    }

    // Fonction pour renvoyer le formulaire d'ajout d'un chauffeur transporteur
    public function create($keytransporteur){
        return view('v1.transporteur.page.chauffeur.create', compact('keytransporteur'));
    }

    // Fonction pour renvoyer le formulaire d'ajout d'un camion chauffeur
    /*public function create1(){
        return view('v1.transporteur.page.camion.create1');
    }*/

}
