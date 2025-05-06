<?php

namespace App\Http\Controllers\Trans;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FretController extends Controller
{
    // Fonction de renvoie de la liste des frets
    public function index() {
        return view('trans.page.fret.index');
    }

    // Fonction de renvoie de détails d'un fret
    public function show($key, $num)
    {
        return view('trans.page.fret.show', ['keyfret' => $key, 'numerofret' => $num]);
    }
}
