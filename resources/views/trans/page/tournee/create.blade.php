@extends('trans.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-primary font-semibold dark:text-white-dark">
            <li class="bg-[#ebedf2] rounded-tl-md rounded-bl-md dark:bg-[#1b2e4b]">
                <a href="javascript:;"
                    class="p-1.5 ltr:pl-3 rtl:pr-3 ltr:pr-2 rtl:pl-2 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#ebedf2] before:z-[1] dark:before:border-l-[#1b2e4b] hover:text-primary/70 dark:hover:text-white-dark/70">Frets</a>
            </li>
            <li class="bg-[#ebedf2] dark:bg-[#1b2e4b]">
                <a
                    class="bg-primary text-white-light p-1.5 ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-primary before:z-[1]">Ajouter
                    tournée</a>
            </li>
            <li class="bg-[#ebedf2] dark:bg-[#1b2e4b]">
                <a href="{{ route('tournee', $keyfret) }}"
                    class="p-1.5 px-3 ltr:pl-6 rtl:pr-6 relative h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#ebedf2] before:z-[1] dark:before:border-l-[#1b2e4b] hover:text-primary/70 dark:hover:text-white-dark/70">Liste
                    des tournées</a>
            </li>
        </ol>

        <div class="pt-5">
            <div>
                <div class="panel">
                    <div class="mb-5 flex items-center justify-between">
                        <h5 class="text-lg font-semibold dark:text-white-light">Formulaire de création de tournée du fret N° {{ $numerodossier }}</h5>
                    </div>
                    <form id="tournee-form" class="space-y-5">
                        @csrf
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input type="hidden" name="keyfret" value="{{ $keyfret }}" />
                            <div>
                                <label for="lieuChargement">Lieu de chargement <span class="text-danger"
                                        title="Obligatoire">*</span></label>
                                <input type="text" placeholder="{{ $lieuChargement }}"
                                    class="form-input disabled:pointer-events-none" readonly />
                                <input type="hidden" name="idlieudepart" value="{{ $idlieuChargement }}" />
                            </div>
                            <div>
                                <label for="lieuDechargement">Lieu de déchargement <span class="text-danger"
                                        title="Obligatoire">*</span></label>
                                <input type="text" placeholder="{{ $lieuDechargement }}"
                                    class="form-input disabled:pointer-events-none" readonly />
                                <input type="hidden" name="idlieuarrivée" value="{{ $idlieuDechargement }}" />
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
                            <button type="reset" class="btn btn-warning">Réinitialiser</button>
                            <button type="submit" class="btn btn-primary">Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
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
