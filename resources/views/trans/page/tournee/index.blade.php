@extends('trans.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-primary font-semibold dark:text-white-dark">
            <li class="bg-[#ebedf2] rounded-tl-md rounded-bl-md dark:bg-[#1b2e4b]"><a href="javascript:;"
                    class="p-1.5 ltr:pl-3 rtl:pr-3 ltr:pr-2 rtl:pl-2 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#ebedf2] before:z-[1] dark:before:border-l-[#1b2e4b] hover:text-primary/70 dark:hover:text-white-dark/70">Frets</a>
            </li>
            <li class="bg-[#ebedf2] dark:bg-[#1b2e4b]"><a
                    class="bg-primary text-white-light p-1.5 ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-primary before:z-[1]">Liste
                    des tournées</a></li>
            <li class="bg-[#ebedf2] dark:bg-[#1b2e4b]"><a href="{{ route('fret') }}"
                    class="p-1.5 px-3 ltr:pl-6 rtl:pr-6 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#ebedf2] before:z-[1] dark:before:border-l-[#1b2e4b] hover:text-primary/70 dark:hover:text-white-dark/70">Liste
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
                            :class="{ '!border-primary text-primary': tab == 'cloturees' }" @click="tab='cloturees'">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 19l-7-7 1.41-1.41L9 16.17l11.59-11.59L22 6l-13 13z" fill="#4CAF50" />
                            </svg>
                            Clôturées
                        </a>
                    </li>
                </ul>
                <template x-if="tab === 'en-attente'">
                    <div>
                        <div class="panel">
                            <div class="mb-5 flex items-center justify-between">
                                <h5 class="text-lg font-semibold dark:text-white-light">Tournées en attente du fret N° {{ $fret['numerodossier'] ?? 'N/A' }}, {{ $fret['lieuchargement']['nom'] ?? 'N/A' }} à {{ $fret['lieudechargement']['nom'] ?? 'N/A' }} </h5>
                                <a href="{{ route('tournee.create', [$fret['keyfret'], $fret['numerodossier'], $fret['lieuchargement']['id'], $fret['lieuchargement']['nom'], $fret['lieudechargement']['id'], $fret['lieudechargement']['nom']]) }}"
                                    class="btn btn-primary">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus-fill me-4" viewBox="0 0 16 16">
                                     <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0"/>
                                   </svg>
                                    Créer une tournée
                                </a>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover" id="myTable" class="whitespace-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Camion favoris</th>
                                                <th>Chauffeur favoris</th>
                                                <th>Poids(Kg)</th>
                                                <th>Numero Bl</th>
                                                <th>Départ prévue</th>
                                                <th>Arrivée prévue</th>
                                                <th>Créée le</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            @php $iteration = 1; @endphp
                                            @foreach ($tournees as $tournee)
                                                @if ($tournee['statut'] == 10)
                                                    <tr>
                                                        <td>{{ $iteration++ }}</td>
                                                        <td>{{ $tournee['camion_actif'][0]['plaque1'] ?? 'N/A' }}/{{ $tournee['camion_actif'][0]['plaque2'] ?? 'N/A' }}
                                                        </td>
                                                        <td>{{ $tournee['chauffeur_actif'][0]['nom'] ?? 'N/A' }}
                                                            {{ $tournee['chauffeur_actif'][0]['prenom'] ?? 'N/A' }}</td>
                                                        <td>{{ $tournee['poids'] }}</td>
                                                        <td>{{ $tournee['numerobl'] }}</td>
                                                        @php
                                                            $createdAt1 = \Carbon\Carbon::parse($tournee['datedepart']);
                                                            $createdAt2 = \Carbon\Carbon::parse($tournee['datearrivee']);
                                                            $formattedDate1 = $createdAt1->format('d/m/Y');
                                                            $formattedDate2 = $createdAt2->format('d/m/Y');
                                                        @endphp
                                                        <td>{{ $formattedDate1 }}</td>
                                                        <td>{{ $formattedDate2 }}</td>
                                                         @php
                                                            $createdAt = \Carbon\Carbon::parse($tournee['created_at']);
                                                            $formattedDate = $createdAt->format('d/m/Y à H:i');
                                                         @endphp
                                                        <td>{{ $formattedDate }}</td>
                                                        <td class="text-center">
                                                            <div class="flex justify-center gap-2">
                                                                <a href="" class="btn btn-sm btn-info" title="Voir les détails">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                        class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                        <path
                                                                            d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                                        <path
                                                                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                                    </svg>
                                                                </a>
                                                                <a href="" class="btn btn-sm btn-primary" title="Modifier tournée">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                                    </svg>
                                                                </a>
                                                                <button type="button" class="btn btn-sm btn-success"  onclick="showAlertStart('{{ $tournee['keytournee'] }}')" title="Démarrer cette tournée">
                                                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                                                                         <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                                                         <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                                                     </svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                @endif
                                            @endforeach
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>#</th>
                                                <th>Camion favoris</th>
                                                <th>Chauffeur favoris</th>
                                                <th>Poids(Kg)</th>
                                                <th>Numero Bl</th>
                                                <th>Départ prévue</th>
                                                <th>Arrivée prévue</th>
                                                <th>Créée le</th>
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
                                <h5 class="text-lg font-semibold dark:text-white-light">Tournées en cours du fret N° {{ $fret['numerodossier'] ?? 'N/A' }}, {{ $fret['lieuchargement']['nom'] ?? 'N/A' }} à {{ $fret['lieudechargement']['nom'] ?? 'N/A' }}</h5>
                                <a href="{{ route('etape.create',  [$fret['keyfret'], $fret['numerodossier']] ) }}" class="btn btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="currentColor" class="bi bi-plus-circle me-4" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path
                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                    </svg>Ajouter les étapes
                                </a>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover" id="myTable" class="whitespace-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Camion actif</th>
                                                <th>Chauffeur actif</th>
                                                <th>Poids(Kg)</th>
                                                <th>Numero Bl</th>
                                                <th>Départ prévue</th>
                                                <th>Arrivée prévue</th>
                                                <th>Démarrée le</th>
                                                <th>Etape actuelle</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="frets-body">
                                            @php $iteration = 1; @endphp
                                            @foreach ($tournees as $tournee)
                                                @if ($tournee['statut'] == 20)
                                                    <tr>
                                                        <td>{{ $iteration++ }}</td>
                                                        <td>{{ $tournee['camion_actif'][0]['plaque1'] ?? 'N/A' }}/{{ $tournee['camion_actif'][0]['plaque2'] ?? 'N/A' }}
                                                        </td>
                                                        <td>{{ $tournee['chauffeur_actif'][0]['nom'] ?? 'N/A' }}
                                                            {{ $tournee['chauffeur_actif'][0]['prenom'] ?? 'N/A' }}</td>
                                                        <td>{{ $tournee['poids'] }}</td>
                                                        <td>{{ $tournee['numerobl'] }}</td>
                                                        <!--<td>{{ $tournee['lieu_depart']['nom'] ?? 'N/A' }}</td>
                                                        <td>{{ $tournee['lieu_arrivee']['nom'] ?? 'N/A' }}</td>-->
                                                        @php
                                                            $createdAt1 = \Carbon\Carbon::parse($tournee['datedepart']);
                                                            $createdAt2 = \Carbon\Carbon::parse($tournee['datearrivee']);
                                                            $formattedDate1 = $createdAt1->format('d/m/Y');
                                                            $formattedDate2 = $createdAt2->format('d/m/Y');
                                                        @endphp
                                                        <td>{{ $formattedDate1 }}</td>
                                                        <td>{{ $formattedDate2 }}</td>
                                                        @php
                                                            $createdAt = \Carbon\Carbon::parse($tournee['updated_at']);
                                                            $formattedDate = $createdAt->format('d/m/Y à H:i');
                                                        @endphp
                                                        <td>{{ $formattedDate }}</td>
                                                        <td>{{ $tournee['derniere_etape']['position'] ?? 'N/A' }}</td>
                                                        <td class="text-center">
                                                            <div class="flex justify-center gap-2">
                                                                <a href="" class="btn btn-sm btn-info" title="Voir les détails">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                        <path
                                                                            d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                                        <path
                                                                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                                    </svg>
                                                                </a>
                                                                <a href="" class="btn btn-sm btn-primary" title="Modifier tournée">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                                                    </svg>
                                                                </a>
                                                                <a href="{{ route('etape.index', [ $tournee['keytournee'], $tournee['numerobl'] ]) }}" class="btn btn-sm btn-warning" title="Voir les étapes">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
                                                                        <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0M2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
                                                                    </svg>
                                                                </a>
                                                                <button type="button" class="btn btn-sm btn-danger"  onclick="showAlertEnd('{{ $tournee['keytournee'] }}')" title="Clôturer cette tournée">
                                                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                                  </svg>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                @endif
                                            @endforeach
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>#</th>
                                                <th>Camion actif</th>
                                                <th>Chauffeur actif</th>
                                                <th>Poids(Kg)</th>
                                                <th>Numero Bl</th>
                                                <th>Départ prévue</th>
                                                <th>Arrivée prévue</th>
                                                <th>Démarrée le</th>
                                                <th>Etape actuelle</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template x-if="tab === 'cloturees'">
                    <div class="switch">
                        <div class="panel">
                            <div class="mb-5 flex items-center justify-between">
                                <h5 class="text-lg font-semibold dark:text-white-light">Tournées clôturées du fret N° {{ $fret['numerodossier'] ?? 'N/A' }}, {{ $fret['lieuchargement']['nom'] ?? 'N/A' }} à {{ $fret['lieudechargement']['nom'] ?? 'N/A' }}</h5>
                            </div>
                            <div class="mb-5">
                                <div class="table-responsive">
                                    <table class="table-hover" id="myTable" class="whitespace-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Camion finaliste</th>
                                                <th>Chauffeur finaliste</th>
                                                <th>Poids(Kg)</th>
                                                <th>Numero Bl</th>
                                                <th>Départ prévue</th>
                                                <th>Arrivée prévue</th>
                                                <th>Clôturéée le</th>
                                                <th>Dernière étape</th>
                                                <th class="text-center">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody id="frets-body">
                                            @php $iteration = 1; @endphp
                                            @foreach ($tournees as $tournee)
                                                @if ($tournee['statut'] == 30)
                                                    <tr>
                                                        <td>{{ $iteration++ }}</td>
                                                        <td>{{ $tournee['camion_actif'][0]['plaque1'] ?? 'N/A' }}/{{ $tournee['camion_actif'][0]['plaque2'] ?? 'N/A' }}
                                                        </td>
                                                        <td>{{ $tournee['chauffeur_actif'][0]['nom'] ?? 'N/A' }}
                                                            {{ $tournee['chauffeur_actif'][0]['prenom'] ?? 'N/A' }}</td>
                                                        <td>{{ $tournee['poids'] }}</td>
                                                        <td>{{ $tournee['numerobl'] }}</td>
                                                        @php
                                                            $createdAt1 = \Carbon\Carbon::parse($tournee['datedepart']);
                                                            $createdAt2 = \Carbon\Carbon::parse($tournee['datearrivee']);
                                                            $formattedDate1 = $createdAt1->format('d/m/Y');
                                                            $formattedDate2 = $createdAt2->format('d/m/Y');
                                                        @endphp
                                                        <td>{{ $formattedDate1 }}</td>
                                                        <td>{{ $formattedDate2 }}</td>
                                                        @php
                                                            $createdAt = \Carbon\Carbon::parse($tournee['updated_at']);
                                                            $formattedDate = $createdAt->format('d/m/Y à H:i');
                                                        @endphp
                                                        <td>{{ $formattedDate }}</td>
                                                         <td>{{ $tournee['derniere_etape']['position'] ?? 'N/A' }}</td>
                                                        <td class="text-center">
                                                            <div class="flex justify-center gap-2">
                                                                <a href="" class="btn btn-sm btn-info" title="Voir les détails">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                        class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                                    </svg>
                                                                </a>
                                                                <a href="{{ route('etape.index', [ $tournee['keytournee'], $tournee['numerobl'] ]) }}" class="btn btn-sm btn-warning" title="Voir les étapes">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
                                                                      <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0M2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"/>
                                                                    </svg>
                                                                </a>
                                                                <a href="" class="btn btn-sm btn-outline-danger"
                                                                    title="Supprimer cette tournee">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                @endif
                                            @endforeach
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>#</th>
                                                <th>Camion finaliste</th>
                                                <th>Chauffeur finaliste</th>
                                                <th>Poids(Kg)</th>
                                                <th>Numero Bl</th>
                                                <th>Départ prévue</th>
                                                <th>Arrivée prévue</th>
                                                <th>Clôturéée le</th>
                                                <th>Dernière étape</th>
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
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
    // Pour démarrer une tournée
    async function showAlertStart(keytournee) {
        const steps = ['1', '2', '3'];
        const swalQueueStep = Swal.mixin({
            confirmButtonText: 'Suivant →',
            showCancelButton: false,
            progressSteps: steps,
            inputAttributes: {
                required: true,
            },
            validationMessage: 'Ce champ est obligatoire',
            padding: '2em',
        });

        const values = {};

        try {
            const positionResult = await swalQueueStep.fire({
                title: 'Position actuelle',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Position actuelle',
                    required: true,
                    name: 'postion',
                },
                currentProgressStep: 0,
            });

            if (!positionResult.value) return;
            values.position = positionResult.value;

            const latitudeResult = await swalQueueStep.fire({
                title: 'Latitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Latitude',
                    required: true,
                    name: 'latitude',
                },
                currentProgressStep: 1,
            });

            if (!latitudeResult.value || !isValidCoordinate(latitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une latitude valide (entre -90 et 90)',
                });
                return;
            }
            values.latitude = parseFloat(latitudeResult.value);

            const longitudeResult = await swalQueueStep.fire({
                title: 'Longitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Longitude',
                    required: true,
                    name: 'longitude',
                },
                currentProgressStep: 2,
            });

            if (!longitudeResult.value || !isValidCoordinate(longitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une longitude valide (entre -180 et 180)',
                });
                return;
            }
            values.longitude = parseFloat(longitudeResult.value);

            const confirmation = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir commencer cette tournée ?',
                padding: '2em',
                confirmButtonText: 'Oui, démarrer',
                showCancelButton: true,
                cancelButtonText: 'Annuler',
            });

            if (confirmation.isConfirmed) {
                const result = await demarrerTournee(keytournee, values);

                await Swal.fire({
                    icon: 'success',
                    title: 'Tournée démarrée avec succès !',
                    timer: 1500,
                    showConfirmButton: false
                });

                window.location.reload();
            }

        } catch (error) {
            const message = error?.response?.data?.message || error.message || 'Une erreur est survenue.';
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: message,
            });
        }
    }

    // Pour va vérification de la longitude et latitude
    function isValidCoordinate(value) {
        const number = parseFloat(value);
        return !isNaN(number) && ((value.includes('.') || value.includes(',')) ? (number >= -90 && number <= 90) : (number >= -180 && number <= 180));
    }

    // Pour clôturer une tournée
    async function showAlertEnd(keytournee) {
        const steps = ['1', '2', '3'];
        const swalQueueStep = Swal.mixin({
            confirmButtonText: 'Suivant →',
            showCancelButton: false,
            progressSteps: steps,
            inputAttributes: {
                required: true,
            },
            validationMessage: 'Ce champ est obligatoire',
            padding: '2em',
        });

        const values = {};

        try {
            const positionResult = await swalQueueStep.fire({
                title: 'Position actuelle',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Position actuelle',
                    required: true,
                    name: 'postion',
                },
                currentProgressStep: 0,
            });

            if (!positionResult.value) return;
            values.position = positionResult.value;

            const latitudeResult = await swalQueueStep.fire({
                title: 'Latitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Latitude',
                    required: true,
                    name: 'latitude',
                },
                currentProgressStep: 1,
            });

            if (!latitudeResult.value || !isValidCoordinate(latitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une latitude valide (entre -90 et 90)',
                });
                return;
            }
            values.latitude = parseFloat(latitudeResult.value);

            const longitudeResult = await swalQueueStep.fire({
                title: 'Longitude',
                input: 'text',
                inputAttributes: {
                    placeholder: 'Longitude',
                    required: true,
                    name: 'longitude',
                },
                currentProgressStep: 2,
            });

            if (!longitudeResult.value || !isValidCoordinate(longitudeResult.value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez entrer une longitude valide (entre -180 et 180)',
                });
                return;
            }
            values.longitude = parseFloat(longitudeResult.value);

            const confirmation = await Swal.fire({
                title: 'Êtes-vous sûr de vouloir clôturer cette tournée ?',
                padding: '2em',
                confirmButtonText: 'Oui, clôturer',
                showCancelButton: true,
                cancelButtonText: 'Annuler',
            });

            if (confirmation.isConfirmed) {
                const result = await cloturerTournee(keytournee, values);

                await Swal.fire({
                    icon: 'success',
                    title: 'Tournée clôturée avec succès !',
                    timer: 1500,
                    showConfirmButton: false
                });

                window.location.reload();
            }

        } catch (error) {
            const message = error?.response?.data?.message || error.message || 'Une erreur est survenue.';
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: message,
            });
        }
    }
</script>

@endsection
