<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\Transporteur\AuthController;
use App\Http\Controllers\V1\Transporteur\FretController;
use App\Http\Controllers\V1\Transporteur\TourneeController;
use App\Http\Controllers\V1\Transporteur\CamionController;
use App\Http\Controllers\V1\Transporteur\ChauffeurController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});*/

Route::get('/', function () {
    return view('v1.transporteur.page.dashboard');
})->name('dashboard');

Route::prefix('/v1/espace/transporteur')->group(function () {
    // Route de renvoie de la page de connexion
    Route::get('/connexion', [AuthController::class, 'loginpage'])->name('connexion');

    // Route de renvoie de la page d'enregistrement
    Route::get('/enregistrement', [AuthController::class, 'registerpage'])->name('enregistrement');

    // Route de renvoie de la page de mot de passe oublié
    Route::get('/mot-passe-oublie', [AuthController::class, 'forgotpasswordpage'])->name('motdepasse-oublié');

    // Route de renvoie de la page des frets attribués
    Route::get('/frets', [FretController::class, 'index'])->name('fret');

    // Route de renvoie de détails d'un fret
    Route::get('/frets/details/{key}', [FretController::class, 'show'])->name('fret.show');

    // Route de renvoie de la page des tournees
    Route::get('/tournees-fret/{keyfret}', [TourneeController::class, 'index'])->name('tournee.index');

    // Route de renvoie de la page d'ajout de tournées
    Route::get('/ajouter-tournee/{keyfret}', [TourneeController::class, 'create'])->name('tournee.create');

    // Route de renvoie de la page des étapes d'une tournées
    Route::get('/tournees-fret/etapes/index/{key}', [TourneeController::class, 'indexEtapes'])->name('etape.index');

    // Route de renvoie de la page d'ajout d'étapes d'un fret
    Route::get('/tournees-fret/etapes/create/{key}', [TourneeController::class, 'createEtapes'])->name('etape.create');

    // Route de renvoie de la page des frets introduits
    Route::get('/frets/introduits', [FretController::class, 'index2'])->name('fret.introduits');

    // Route de renvoie des propostions de prix d'un fret
    Route::get('/frets/introduits/propostions-prix/{keyfret}', [FretController::class, 'show2'])->name('fret.propostions');

    // Route de renvoie de la page des camions
    Route::get('/mescamions', [CamionController::class, 'index'])->name('camions.index');

    // Route de renvoie du formulaire d'ajout de camion
    Route::get('/mescamions/ajouter-camion/{keytransporteur}', [CamionController::class, 'create'])->name('camions.create');

    // Route de renvoie de la liste des chauffeurs du transporteur
    Route::get('/meschauffeurs', [ChauffeurController::class, 'index'])->name('chauffeur.index');

});

