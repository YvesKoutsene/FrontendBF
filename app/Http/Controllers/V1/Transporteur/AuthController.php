<?php

namespace App\Http\Controllers\V1\Transporteur;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Fonction de renvoie du formulaire d'authentification
    public function loginpage()
    {
        return view('v1.transporteur.page.auth.login');
    }

    // Fonction de renvoie du formulaire d'enrégistrement
    public function registerpage()
    {
        return view('v1.transporteur.page.auth.register');
    }

    // Fonction de renvoie de la page de mot de passe oublié
    public function forgotpasswordpage()
    {
        return view('v1.transporteur.page.auth.forgot-password');
    }
}
