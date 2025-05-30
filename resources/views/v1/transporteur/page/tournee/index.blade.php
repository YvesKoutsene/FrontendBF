@extends('v1.transporteur.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li><a href="">Frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="{{ route('fret') }}">Liste des frets</a></li>
            <li class="before:content-['/'] before:px-1.5"><a href="" class="text-warning dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Liste des tournées</a></li>
        </ol>

        <div class="pt-5">
            <div class="panel">
               <div class=" mb-4 gap-4 flex items-center justify-center">
                   <h5 id="titreFret" class="text-lg font-semibold dark:text-white-light"></h5>
               </div>
              <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <div>
                  <label for="entries-select" class="text-sm font-medium text-gray-700">Nombre d'entrées
                      <select id="entries-select" class="ml-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                        <option value="10" selected>10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                   </label>
                </div>
                <div class="relative w-full sm:w-64">
                    <input type="text" id="search-input" placeholder="Rechercher ici..." class="form-input shadow-[0_0_4px_2px_rgb(31_45_61/_10%)] bg-white rounded-full h-11 pl-10 pr-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                       <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                               <path d="M12.9 14.32A7.5 7.5 0 1 0 14.32 12.9l3.7 3.7a1 1 0 0 0 1.42-1.42l-3.7-3.7zM10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                           </svg>
                       </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 mb-4 ">
                  <button data-statut="statut10" class="tab-button active bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                          <path d="M11 6h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                      Tournées en attente
                  </button>
                  <button data-statut="statut20" class="tab-button bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                          <path d="M10 10h4v4h-4z"/>
                      </svg>
                      Tournées en cours
                  </button>
                  <button data-statut="statut30" class="tab-button bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                          <path d="M9 12l2 2 4-4-1.5-1.5L11 11l-1-1z"/>
                      </svg>
                      Tournées clôturées
                  </button>
              </div>

              <div id="statut10-wrapper" class="tournee-table-group mb-5">
                <div class="mb-5 flex items-end justify-end ">
                    <a id="btnCreerTournee" href="{{ route('tournee.create', $keyfret) }}" class="btn btn-warning disabled opacity-50 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus-fill me-4" viewBox="0 0 16 16">
                            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                        </svg>
                        Créer une tournée
                    </a>
                </div>
                <div class="overflow-auto rounded-lg shadow mb-4 table-responsive">
                  <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap">
                    <thead class="bg-gray-50 font-medium text-gray-700">
                      <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. tournée</th>
                        <th class="px-4 py-2 border">Camion</th>
                        <th class="px-4 py-2 border">Chauffeur</th>
                        <th class="px-4 py-2 border">Poids (Kg)</th>
                        <th class="px-4 py-2 border">Départ prévue</th>
                        <th class="px-4 py-2 border">Arrivée prévue</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="statut10-body" class="divide-y divide-gray-100 bg-white"></tbody>
                    <tfoot class="bg-gray-50 font-medium text-gray-700">
                    <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. tournée</th>
                        <th class="px-4 py-2 border">Camion</th>
                        <th class="px-4 py-2 border">Chauffeur</th>
                        <th class="px-4 py-2 border">Poids (Kg)</th>
                        <th class="px-4 py-2 border">Départ prévue</th>
                        <th class="px-4 py-2 border">Arrivée prévue</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div id="statut10-pagination" class="flex flex-wrap gap-2 justify-end mt-2"></div>
              </div>

              <div id="statut20-wrapper" class="tournee-table-group hidden mb-5">
                <div class="mb-5 flex items-end justify-end">
                    <a id="btnAjouterEtape" href="{{ route('etape.create', $keyfret) }}" class="btn btn-warning disabled opacity-50 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill me-4" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                        </svg>
                        Ajouter les étapes
                    </a>
                </div>
                <div class="overflow-auto rounded-lg shadow mb-4 table-responsive">
                  <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap">
                    <thead class="bg-gray-50 font-medium text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">#</th>
                            <th class="px-4 py-2 border">Num. tournée</th>
                            <th class="px-4 py-2 border">Camion</th>
                            <th class="px-4 py-2 border">Chauffeur</th>
                            <th class="px-4 py-2 border">Poids (Kg)</th>
                            <th class="px-4 py-2 border">Départ prévue</th>
                            <th class="px-4 py-2 border">Arrivée prévue</th>
                            <th class="px-4 py-2 border">Date démarrage</th>
                            <th class="px-4 py-2 border">Étape actuelle</th>
                            <th class="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="statut20-body" class="divide-y divide-gray-100 bg-white"></tbody>
                    <tfoot class="bg-gray-50 font-medium text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">#</th>
                            <th class="px-4 py-2 border">Num. tournée</th>
                            <th class="px-4 py-2 border">Camion</th>
                            <th class="px-4 py-2 border">Chauffeur</th>
                            <th class="px-4 py-2 border">Poids (Kg)</th>
                            <th class="px-4 py-2 border">Départ prévue</th>
                            <th class="px-4 py-2 border">Arrivée prévue</th>
                            <th class="px-4 py-2 border">Date démarrage</th>
                            <th class="px-4 py-2 border">Étape actuelle</th>
                            <th class="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </tfoot>
                  </table>
                </div>
                <div id="statut20-pagination" class="flex flex-wrap gap-2 justify-end mt-2"></div>
              </div>

              <div id="statut30-wrapper" class="tournee-table-group hidden mb-5">
                <div class="overflow-auto rounded-lg shadow mb-4 table-responsive">
                  <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap">
                    <thead class="bg-gray-50 font-medium text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">#</th>
                            <th class="px-4 py-2 border">Num. tournée</th>
                            <th class="px-4 py-2 border">Camion</th>
                            <th class="px-4 py-2 border">Chauffeur</th>
                            <th class="px-4 py-2 border">Poids (Kg)</th>
                            <th class="px-4 py-2 border">Départ prévue</th>
                            <th class="px-4 py-2 border">Arrivée prévue</th>
                            <th class="px-4 py-2 border">Date clôture</th>
                            <th class="px-4 py-2 border">Dernière étape</th>
                            <th class="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="statut30-body" class="divide-y divide-gray-100 bg-white"></tbody>
                    <tfoot class="bg-gray-50 font-medium text-gray-700">
                        <tr>
                            <th class="px-4 py-2 border">#</th>
                            <th class="px-4 py-2 border">Num. tournée</th>
                            <th class="px-4 py-2 border">Camion</th>
                            <th class="px-4 py-2 border">Chauffeur</th>
                            <th class="px-4 py-2 border">Poids (Kg)</th>
                            <th class="px-4 py-2 border">Départ prévue</th>
                            <th class="px-4 py-2 border">Arrivée prévue</th>
                            <th class="px-4 py-2 border">Date clôture</th>
                            <th class="px-4 py-2 border">Dernière étape</th>
                            <th class="px-4 py-2 border text-center">Actions</th>
                        </tr>
                    </tfoot>
                  </table>
                </div>
                <div id="statut30-pagination" class="flex flex-wrap gap-2 justify-end mt-2"></div>
              </div>
            </div>
        </div>
    </div>

 <script>
        window.keyfret = "{{ $keyfret }}";
 </script>

@include('v1.transporteur.page.tournee.modal') <!-- Pour les deux fenêtres modales (Démarrer et clôturer tournee)-->

@endsection
