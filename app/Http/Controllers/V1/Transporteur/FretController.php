<?php

namespace App\Http\Controllers\V1\Transporteur;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FretController extends Controller
{
    // Fonction de renvoie de la liste des frets attribués
    public function index() {
        return view('v1.transporteur.page.fret.index');
    }

    // Fonction de renvoie de détails d'un fret
    public function show($keyfret)
    {
        return view('v1.transporteur.page.fret.show', compact('keyfret'));
    }

    // Fonction de renvoie de la liste des frets introduits
    public function index2() {
        return view('v1.transporteur.page.fret.index2');
    }

    // Fonction de renvoie de la liste des propositions d'un fret
    public function show2($keyfret) {
        return view('v1.transporteur.page.fret.show2', compact('keyfret'));
    }

}
