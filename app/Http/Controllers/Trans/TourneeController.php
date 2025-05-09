<?php

namespace App\Http\Controllers\Trans;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TourneeController extends Controller
{
    // Fonction de renvoie de la liste des tournees d'un fret
    public function index($keyfret)
    {
        return view('trans.page.tournee.index', compact('keyfret'));
    }

    // Fonction pour renvoyer la page de création de tournee
    public function create($keyfret) {
        return view('trans.page.tournee.create', compact('keyfret'));
    }

    // Fonction pour renvoyer la page index des étapes d'une tournée
    public function indexEtapes($keytournee)
    {
        return view('trans.page.etape.index', compact('keytournee'));
    }

    // Fonction pour renvoyer la page d'ajout d'étapes d'un fret
    public function createEtapes($keyfret)
    {
        return view('trans.page.etape.create', compact('keyfret'));
    }

}
