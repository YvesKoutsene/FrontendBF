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

@endsection
