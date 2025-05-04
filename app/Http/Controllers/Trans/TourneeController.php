<?php

namespace App\Http\Controllers\Trans;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TourneeController extends Controller
{
    // Fonction de renvoie de la liste des frets
    public function index($key)
    {
        $response = Http::get("http://127.0.0.1:2000/api/v1/trans/tournees-fret/$key");

        if ($response->successful()) {
            $data = $response->json();

            $tournees = $data['tournees'] ?? []; //
            $fret = $data['fret'] ?? []; //

            return view('trans.page.tournee.index', compact('tournees', 'fret'));
        } else {
            abort(500, 'Erreur lors de la récupération des tournées');
        }
    }

     /*public function index($key)
     {
        return view('trans.page.tournee.index');
     }*/

    // Fonction de renvoie de la page de création de tournees
    public function create($keyfret, $numerodossier, $idlieuChargement, $lieuChargement, $idlieuDechargement, $lieuDechargement) {
        return view('trans.page.tournee.create', compact('keyfret', 'numerodossier', 'idlieuChargement','lieuChargement', 'idlieuDechargement', 'lieuDechargement'));
    }

    // Fonction pour renvoyer la page index des étapes d'une tournée
    public function indexEtapes($key, $num)
    {
        return view('trans.page.etape.index', ['keytournee' => $key, 'numerobl' => $num]);
    }

    // Fonction pour renvoyer la page d'ajout d'étapes d'un fret
    public function createEtapes($key, $num)
    {
        return view('trans.page.etape.create', ['keyfret' => $key, 'numerodossier' => $num]);
    }


}
