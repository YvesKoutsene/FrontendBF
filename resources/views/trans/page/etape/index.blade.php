@extends('trans.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li><a href="">Frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="{{ route('fret') }}">Liste des frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="javascript:history.back();">Liste des tournées</a></li>
            <li class="before:content-['/'] before:px-1.5"><a href="" class="text-warning dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Liste étapes</a></li>
        </ol>

        <div class="pt-5">
            <div class="panel">
                <div class="mb-5 flex items-center justify-between">
                    <h5 class="text-lg font-semibold dark:text-white-light">Etapes de la tournée du N°BL {{ $numerobl }}</h5>
                </div>
                <div class="mb-5">
                    <div class="table-responsive">
                        <table class="table-hover" id="myTable" class="whitespace-nowrap">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Position</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Date position</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="etapes-body">

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                    <th>Position</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Date position</th>
                                    <th class="text-center">Actions</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

 <script>
        window.keytournee = "{{ $keytournee }}";
 </script>

@endsection
