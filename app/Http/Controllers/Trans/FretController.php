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
}
