@extends('trans.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li><a href="">Frets</a></li>
            <li class="before:content-['/'] before:px-1.5"><a href=""
                    class="text-warning dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Liste des
                    frets</a></li>
        </ol>
        <div class="pt-5">
            <div x-data="{ tab: 'en-cours' }">
                <ul
                    class="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                    <li class="inline-block">
                        <a href="javascript:;" data-statut="40" class="flex gap-2 border-b border-transparent p-4 hover:border-warning hover:text-warning"
                            :class="{ '!border-warning text-warning': tab == 'en-cours' }" @click="tab='en-cours'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8c-1.11 0-2.16-.23-3.12-.62l-2.65 2.65C8.53 20.57 10.22 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
                                    fill="#008CBA" />
                                <path d="M12 6v6l4 2" stroke="#008CBA" stroke-width="2" />
                            </svg>
                            En attente
                        </a>
                    </li>
                    <li class="inline-block">
                        <a href="javascript:;" data-statut="50"
                            class="flex gap-2 border-b border-transparent p-4 hover:border-warning hover:text-warning"
                            :class="{ '!border-warning text-warning': tab == 'livres' }" @click="tab='livres'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 19l-7-7 1.41-1.41L9 16.17l11.59-11.59L22 6l-13 13z" fill="#008CBA" />
                            </svg>
                            Livrés
                        </a>
                    </li>
                </ul>
                <template x-if="tab === 'en-cours'" data-statut="40">
                    <div>
                        <div class="panel">
                            <div class="mb-5 flex items-center justify-between">
                                <h5 class="text-lg font-semibold dark:text-white-light">Frets en attente</h5>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                              <div>
                                <label for="entries-select" class="text-sm font-medium text-gray-700">

                                  <select id="entries-select" class="ml-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                                    <option value="5">5</option>
                                    <option value="10" selected>10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                  </select>
                                  entrées
                                </label>
                              </div>
                              <div class="relative w-full sm:w-64">
                                <input type="text" id="search-input" placeholder="Rechercher ici..." class="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider"/>
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                              </div>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover whitespace-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Numero fret</th>
                                                <th>Numero dossier</th>
                                                <th>Lieu chargement</th>
                                                <th>Lieu déchargement</th>
                                                <th>Type marchandise</th>
                                                <th>Date de demande</th>
                                                <th>Poids m/se(kg)</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="frets-table-body"></tbody>

                                        <tfoot>
                                            <tr>
                                                <th>#</th>
                                                <th>Numero fret</th>
                                                <th>Numero dossier</th>
                                                <th>Lieu chargement</th>
                                                <th>Lieu déchargement</th>
                                                <th>Type marchandise</th>
                                                <th>Date de demande</th>
                                                <th>Poids m/se(kg)</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div id="pagination" class="mt-3 flex gap-2 flex-wrap justify-end"></div>
                        </div>
                    </div>
                </template>
                <template x-if="tab === 'livres'" data-statut="50">
                    <div class="switch">
                        <div class="panel">
                            <div class="mb-5 flex items-center justify-between">
                                <h5 class="text-lg font-semibold dark:text-white-light">Frets livrés</h5>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                              <div>
                                <label for="entries-select" class="text-sm font-medium text-gray-700">
                                  <select id="entries-select" class="ml-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                                    <option value="5">5</option>
                                    <option value="10" selected>10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                  </select>
                                  entrées
                                </label>
                              </div>
                              <div class="relative w-full sm:w-64">
                                <input type="text" id="search-input" placeholder="Rechercher ici..." class="form-input shadow-[0_0_4px_2px_rgb(31_45_61_/_10%)] bg-white rounded-full h-11 placeholder:tracking-wider"/>
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                </div>
                              </div>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover" id="myTable-livre" class="whitespace-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Numero fret</th>
                                                <th>Numero dossier</th>
                                                <th>Lieu chargement</th>
                                                <th>Lieu déchargement</th>
                                                <th>Type marchandise</th>
                                                <th>Date de demande</th>
                                                <th>Poids m/se(kg)</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="frets-table-body">
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>#</th>
                                                <th>Numero fret</th>
                                                <th>Numero dossier</th>
                                                <th>Lieu chargement</th>
                                                <th>Lieu déchargement</th>
                                                <th>Type marchandise</th>
                                                <th>Date de demande</th>
                                                <th>Poids m/se(kg)</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <div id="pagination" class="mt-3 flex gap-2 flex-wrap justify-end"></div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>

@endsection
