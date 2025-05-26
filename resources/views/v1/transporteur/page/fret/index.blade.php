@extends('v1.transporteur.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li><a href="">Frets</a></li>
            <li class="before:content-['/'] before:px-1.5"><a href="" class="text-warning dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Liste des frets attribués</a></li>
        </ol>

        <div class="pt-5">
            <div class="panel">

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
                  <button data-statut="incomplets" class="tab-button active bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                          <path d="M11 6h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                      Frets en attente de traitement
                  </button>
                  <button data-statut="complets" class="tab-button bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                          <path d="M14.5 8.5l-1.5 1.5-3-3-1.5 1.5 4.5 4.5 3-3z"/>
                      </svg>
                      Frets traités
                  </button>
                  <button data-statut="statut40" class="tab-button bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                          <path d="M10 10h4v4h-4z"/>
                      </svg>
                      Frets en cours
                  </button>
                  <button data-statut="statut50" class="tab-button bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold shadow flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 18a8 8 0 110-16 8 8 0 010 16z"/>
                          <path d="M9 12l2 2 4-4-1.5-1.5L11 11l-1-1z"/>
                      </svg>
                      Frets livrés
                  </button>
              </div>

              <div id="incomplets-wrapper" class="fret-table-group mb-5">
                <div class="overflow-auto rounded-lg shadow mb-4 table-responsive">
                  <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap">
                    <thead class="bg-gray-50 font-medium text-gray-700">
                      <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="incomplets-body" class="divide-y divide-gray-100 bg-white"></tbody>
                    <tfoot class="bg-gray-50 font-medium text-gray-700">
                       <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div id="incomplets-pagination" class="flex flex-wrap gap-2 justify-end mt-2"></div>
              </div>

              <div id="complets-wrapper" class="fret-table-group hidden mb-5">
                <div class="overflow-auto rounded-lg shadow mb-4  table-responsive">
                  <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap">
                    <thead class="bg-gray-50 font-medium text-gray-700">
                      <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 borde text-centerr">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="complets-body" class="divide-y divide-gray-100 bg-white"></tbody>
                    <tfoot class="bg-gray-50 font-medium text-gray-700">
                       <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div id="complets-pagination" class="flex flex-wrap gap-2 justify-end mt-2"></div>
              </div>

              <div id="statut40-wrapper" class="fret-table-group hidden mb-5">
                <div class="overflow-auto rounded-lg shadow mb-4 table-responsive">
                  <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap">
                    <thead class="bg-gray-50 font-medium text-gray-700">
                      <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="statut40-body" class="divide-y divide-gray-100 bg-white"></tbody>
                    <tfoot class="bg-gray-50 font-medium text-gray-700">
                       <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div id="statut40-pagination" class="flex flex-wrap gap-2 justify-end mt-2"></div>
              </div>

              <div id="statut50-wrapper" class="fret-table-group hidden mb-5">
                <div class="overflow-auto rounded-lg shadow mb-4 table-responsive">
                  <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap">
                    <thead class="bg-gray-50 font-medium text-gray-700">
                      <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody id="statut50-body" class="divide-y divide-gray-100 bg-white"></tbody>
                    <tfoot class="bg-gray-50 font-medium text-gray-700">
                       <tr>
                        <th class="px-4 py-2 border">#</th>
                        <th class="px-4 py-2 border">Num. Fret</th>
                        <th class="px-4 py-2 border">Num. Dossier</th>
                        <th class="px-4 py-2 border">Lieu chargement</th>
                        <th class="px-4 py-2 border">Lieu déchargement</th>
                        <th class="px-4 py-2 border">Type marchandise</th>
                        <th class="px-4 py-2 border">Date création</th>
                        <th class="px-4 py-2 border">Poids (kg)</th>
                        <th class="px-4 py-2 border text-center">Actions</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div id="statut50-pagination" class="flex flex-wrap gap-2 justify-end mt-2"></div>
              </div>
            </div>
        </div>

    </div>
@endsection
