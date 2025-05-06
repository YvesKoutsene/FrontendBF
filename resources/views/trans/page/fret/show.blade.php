@extends('trans.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
            <li><a href="">Frets</a></li>
            <li  class="before:content-['/'] before:px-1.5"><a href="{{ route('fret') }}">Liste des frets</a></li>
            <li class="before:content-['/'] before:px-1.5"><a href="" class="text-warning dark:text-white-light hover:text-black/70 dark:hover:text-white-light/70">Détails fret</a></li>
        </ol>

        <div class="pt-5">
            <div>
                <div class="panel">
                    <div class="mb-5 flex items-center justify-between">
                            <h5 class="text-lg font-semibold dark:text-white-light">Détails du fret N° {{ $numerofret }}</h5>
                    </div>



                </div>
            </div>
        </div>

    </div>

 <script>
        window.keyfret = "{{ $keyfret }}";
 </script>

@endsection
