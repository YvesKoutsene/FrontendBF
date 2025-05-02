@extends('trans.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-primary font-semibold dark:text-white-dark">
            <li class="bg-[#ebedf2] rounded-tl-md rounded-bl-md dark:bg-[#1b2e4b]"><a href="javascript:;"
                    class="p-1.5 ltr:pl-3 rtl:pr-3 ltr:pr-2 rtl:pl-2 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#ebedf2] before:z-[1] dark:before:border-l-[#1b2e4b] hover:text-primary/70 dark:hover:text-white-dark/70">Frets</a>
            </li>
            <li class="bg-[#ebedf2] dark:bg-[#1b2e4b]"><a
                    class="bg-primary text-white-light p-1.5 ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-primary before:z-[1]">Liste
                    des frets</a></li>
        </ol>

        <div class="pt-5">
            <div x-data="{ tab: 'en-attente' }">
                <ul
                    class="mb-5 overflow-y-auto whitespace-nowrap border-b border-[#ebedf2] font-semibold dark:border-[#191e3a] sm:flex">
                    <li class="inline-block">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': tab == 'en-attente' }" @click="tab='en-attente'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" stroke="#FFA500" stroke-width="2" />
                                <line x1="12" y1="8" x2="12" y2="12" stroke="#FFA500"
                                    stroke-width="2" />
                                <line x1="12" y1="16" x2="12" y2="16" stroke="#FFA500"
                                    stroke-width="2" />
                            </svg>
                            En attente
                        </a>
                    </li>
                    <li class="inline-block">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': tab == 'en-cours' }" @click="tab='en-cours'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12h2c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8c-1.11 0-2.16-.23-3.12-.62l-2.65 2.65C8.53 20.57 10.22 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
                                    fill="#008CBA" />
                                <path d="M12 6v6l4 2" stroke="#008CBA" stroke-width="2" />
                            </svg>
                            En cours
                        </a>
                    </li>
                    <li class="inline-block">
                        <a href="javascript:;"
                            class="flex gap-2 border-b border-transparent p-4 hover:border-primary hover:text-primary"
                            :class="{ '!border-primary text-primary': tab == 'livres' }" @click="tab='livres'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 19l-7-7 1.41-1.41L9 16.17l11.59-11.59L22 6l-13 13z" fill="#4CAF50" />
                            </svg>
                            Livrés
                        </a>
                    </li>
                </ul>
                <template x-if="tab === 'en-attente'">
                    <div>
                        <div class="panel">
                            <div class="mb-5 flex items-center justify-between">
                                <h5 class="text-lg font-semibold dark:text-white-light">Frets en attente</h5>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover" id="myTable" class="whitespace-nowrap">
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
                                        <tbody id="frets-body">

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

                        </div>
                    </div>
                </template>
                <template x-if="tab === 'en-cours'">
                    <div>
                        <div class="panel">
                            <div class="mb-5 flex items-center justify-between">
                                <h5 class="text-lg font-semibold dark:text-white-light">Frets en attente</h5>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover" id="myTable" class="whitespace-nowrap">
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
                                        <tbody id="frets-body">

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

                        </div>
                    </div>
                </template>
                <template x-if="tab === 'livres'">
                    <div class="switch">

                        <div class="panel">
                            <div class="mb-5 flex items-center justify-between">
                                <h5 class="text-lg font-semibold dark:text-white-light">Frets en attente</h5>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover" id="myTable" class="whitespace-nowrap">
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
                                        <tbody id="frets-body">

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
                        </div>
                    </div>
                </template>
            </div>
        </div>

    </div>
@endsection
