<?php

namespace App\Http\Controllers\Trans;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Fonction de renvoie du formulaire d'authentification
    public function loginpage()
    {
        return view('trans.page.auth.login');
    }

    // Fonction de renvoie du formulaire d'enrégistrement
    public function registerpage()
    {
        return view('trans.page.auth.register');
    }

    // Fonction de renvoie de la page de mot de passe oublié
    public function forgotpasswordpage()
    {
        return view('transp.page.auth.forgot-password');
    }
}
