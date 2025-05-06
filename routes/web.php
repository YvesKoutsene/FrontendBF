<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Trans\AuthController;
use App\Http\Controllers\Trans\FretController;
use App\Http\Controllers\Trans\TourneeController;

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
    return view('trans.page.dashboard');
})->name('dashboard');

// Route de renvoie de la page de connexion
Route::get('/espace/trans/connexion', [AuthController::class, 'loginpage'])->name('connexion');

// Route de renvoie de la page d'enregistrement
Route::get('/espace/trans/enregistrement', [AuthController::class, 'registerpage'])->name('enregistrement');

// Route de renvoie de la page de mot de passe oublié
Route::get('/espace/trans/mot-passe-oublie', [AuthController::class, 'forgotpasswordpage'])->name('motdepasse-oublié');

// Route de renvoie de la page des frets en cours
Route::get('/espace/trans/frets', [FretController::class, 'index'])->name('fret');

// Route de renvoie de détails d'un fret
Route::get('/espace/trans/frets/details/{key}/{num}', [FretController::class, 'show'])->name('fret.show');

// Route de renvoie de la page des tournees
Route::get('/espace/trans/tournees-fret/{key}', [TourneeController::class, 'index'])->name('tournee');

// Route de renvoie de la page d'ajout de tournées
Route::get('/espace/trans/ajouter-tournee/{keyfret}/{numerofret}/{idlieuChargement}/{lieuChargement}/{idlieuDechargement}/{lieuDechargement}', [TourneeController::class, 'create'])->name('tournee.create');

// Route de renvoie de la page des étapes d'une tournées
Route::get('/espace/trans/tournees-fret/etapes/index/{key}/{num}', [TourneeController::class, 'indexEtapes'])->name('etape.index');

// Route de renvoie de la page d'ajout d'étapes d'un fret
Route::get('/espace/trans/tournees-fret/etapes/create/{key}/{num}', [TourneeController::class, 'createEtapes'])->name('etape.create');


