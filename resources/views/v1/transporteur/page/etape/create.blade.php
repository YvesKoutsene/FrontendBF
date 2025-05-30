@extends('v1.transporteur.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li><a href="">Frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="{{ route('fret') }}">Liste des frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="{{ route('tournee.index', $keyfret) }}">Liste des tournées</a></li>
            <li class="before:content-['/'] before:px-1.5"><a href="" class="text-warning dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Ajouter étapes</a></li>
        </ol>

        <div class="pt-5">
            <div>
                <div class="panel">
                    <div class="gap-4 mb-5 flex items-center justify-between">
                        <h5 id="num" class="text-lg font-semibold dark:text-white-light">Formulaire d'ajout d'étapes</h5>
                    </div>
                    <form id="addetape-form" class="space-y-5">
                        @csrf
                        <div id="tournees-container" class="space-y-5">
                        </div>
                        <small class="text-muted flex space-x-4 mt-6">
                            <span class="text-danger">NB: * Champs obligatoires</span>
                        </small>
                        <div class="flex space-x-4 justify-end items-end mt-6">
                            <button type="reset" class="btn btn-danger">Réinitialiser</button>
                            <button id="submit-etape" type="submit" class="btn btn-warning flex items-center justify-center gap-2">
                              <svg id="spinner-etape" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                class="hidden h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg">
                                <line x1="12" y1="2" x2="12" y2="6"></line>
                                <line x1="12" y1="18" x2="12" y2="22"></line>
                                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                <line x1="2" y1="12" x2="6" y2="12"></line>
                                <line x1="18" y1="12" x2="22" y2="12"></line>
                                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                              </svg>
                              <span id="text-etape">Enregistrer</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        window.keyfret = "{{ $keyfret }}";
    </script>

@endsection
