@extends('v1.transporteur.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li><a href="">Frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="{{ route('fret') }}">Liste des frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="{{ route('tournee.index', $keyfret) }}">Liste des tournées</a></li>
            <li class="before:content-['/'] before:px-1.5"><a href="" class="text-warning dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Ajouter tournée</a></li>
        </ol>

        <div class="pt-5">
            <div>
                <div class="panel">
                    <div class=" mb-4 gap-4 flex items-center justify-center">
                        <h5 id="titreFret" class="text-lg font-semibold dark:text-white-light"></h5>
                    </div>
                    <div class=" mb-4 gap-4 flex items-center justify-between">
                        <h5 class="text-lg font-semibold dark:text-white-light">Formulaire de création de tournee</h5>
                    </div>

                    <form id="tournee-form" class="space-y-5">
                        @csrf
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="hidden" name="keyfret" value="{{ $keyfret }}" />
                            <div>
                                <label for="lieuChargement">Lieu de chargement <span class="text-danger" title="Obligatoire">*</span></label>
                                <input id="lieuChargementNom" type="text" class="form-input disabled:pointer-events-none" readonly />
                                <input id="lieuChargementId" type="hidden" name="idlieudepart" />
                            </div>
                            <div>
                                <label for="lieuDechargement">Lieu de déchargement <span class="text-danger" title="Obligatoire">*</span></label>
                                <input id="lieuDechargementNom" type="text" class="form-input disabled:pointer-events-none" readonly />
                                <input id="lieuDechargementId" type="hidden" name="idlieuarrivée" />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label for="chauffeurs-select">Mes chauffeurs<span class="text-danger"
                                        title="Obligatoire">*</span></label>
                                <select id="chauffeurs-select" class="form-select text-white-dark" required>
                                    <option value="">Choisir un chauffeur...</option>
                                </select>
                            </div>
                            <div>
                                <label for="camions-select">Mes camions<span class="text-danger"
                                        title="Obligatoire">*</span></label>
                                <select id="camions-select" class="form-select text-white-dark" required>
                                    <option value="">Choisir un camion...</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div x-data="form">
                                <label for="gridEmail">Départ prévue<span class="text-danger"
                                        title="Obligatoire">*</span></label>
                                <input type="date" name="datedepart" id="datedepart" class="form-input" required/>
                            </div>
                            <div x-data="form">
                                <label for="gridPassword">Arrivée prévue<span class="text-danger"
                                        title="Obligatoire">*</span></label>
                                <input type="date" name="datearrivee" id="datearrivee" class="form-input" required/>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div class="md:col-span-2">
                                <label for="gridCity">Poids du chargement<span class="text-danger"
                                        title="Obligatoire">*</span></label>
                                <div class="flex">
                                    <div
                                        class="bg-[#eee] flex justify-center items-center ltr:rounded-l-md rtl:rounded-r-md px-3 font-semibold border ltr:border-r-0 rtl:border-l-0 border-[#e0e6ed] dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                        Kg</div>
                                    <input type="text" name="poids" id="poids"
                                        placeholder="Ex: 2504.15" oninput="validateInput()"
                                        class="form-input ltr:rounded-l-none rtl:rounded-r-none flex-1" required />
                                </div>
                            </div>
                            <div>
                                <label for="gridState">Numéro BL</label>
                                <input id="gridZip" type="text" id="numerobl" name="numerobl" placeholder="Ex: BL-001245" class="form-input" />
                            </div>
                            <div>
                                <label for="gridZip">Numéro conteneur</label>
                                <input id="gridZip" type="text" id="numeroconteneur" name="numeroconteneur" placeholder="Ex: CONT-987654" class="form-input" />
                            </div>
                            <small class="text-muted"><span class="text-danger">NB: * Champs obligatoires</span></small>
                        </div>
                        <div class="flex space-x-4 justify-end items-end mt-6">
                            <button type="reset" class="btn btn-danger">Réinitialiser</button>
                            <button type="submit" class="btn btn-warning">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>

   <script>
       window.keyfret = "{{ $keyfret }}";
   </script>

   <script>
       function validateInput() {
           const input = document.getElementById('poids');
           input.value = input.value.replace(/[^0-9.]/g, '');

           if (input.value.length > 10) {
               input.value = input.value.substring(0, 10);
           }

           const parts = input.value.split('.');
           if (parts.length > 2) {
               input.value = parts[0] + '.' + parts[1];
           }
       }
   </script>

@endsection
