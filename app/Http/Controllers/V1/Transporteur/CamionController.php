<?php

namespace App\Http\Controllers\V1\Transporteur;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CamionController extends Controller
{
    // Fonction de renvoyer la page de la liste des camions
    public function index(){
        return view('v1.transporteur.page.camion.index');
    }

    // Fonction pour renvoyer le formulaire d'ajout d'un camion transporteur
    public function create($keytransporteur){
        return view('v1.transporteur.page.camion.create', compact('keytransporteur'));
    }

    // Fonction pour renvoyer le formulaire d'ajout d'un camion chauffeur
    /*public function create1(){
        return view('v1.transporteur.page.camion.create1');
    }*/

}
