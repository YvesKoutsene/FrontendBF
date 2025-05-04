@extends('trans.include.layouts.app')
@section('content')
    <div>
        <ol class="flex text-primary font-semibold dark:text-white-dark">
            <li class="bg-[#ebedf2] rounded-tl-md rounded-bl-md dark:bg-[#1b2e4b]"><a href="javascript:;"
                    class="p-1.5 ltr:pl-3 rtl:pr-3 ltr:pr-2 rtl:pl-2 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#ebedf2] before:z-[1] dark:before:border-l-[#1b2e4b] hover:text-primary/70 dark:hover:text-white-dark/70">Frets</a>
            </li>
            <li class="bg-[#ebedf2] dark:bg-[#1b2e4b]"><a
                    class="bg-primary text-white-light p-1.5 ltr:pl-6 rtl:pr-6 ltr:pr-2 rtl:pl-2 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-primary before:z-[1]">Ajouter
                    les étapes
                </a></li>
            <li class="bg-[#ebedf2] dark:bg-[#1b2e4b]"><a href="javascript:history.back();"
                    class="p-1.5 px-3 ltr:pl-6 rtl:pr-6 relative  h-full flex items-center before:absolute ltr:before:-right-[15px] rtl:before:-left-[15px] rtl:before:rotate-180 before:inset-y-0 before:m-auto before:w-0 before:h-0 before:border-[16px] before:border-l-[15px] before:border-r-0 before:border-t-transparent before:border-b-transparent before:border-l-[#ebedf2] before:z-[1] dark:before:border-l-[#1b2e4b] hover:text-primary/70 dark:hover:text-white-dark/70">Liste
                    des tournées</a></li>
        </ol>

        <div class="pt-5">
            <div>
                <div class="panel">
                    <div class="mb-5 flex items-center justify-between">
                        <h5 class="text-lg font-semibold dark:text-white-light">Formulaire d'ajout d'étapes des tournées en cours du fret N° {{ $numerodossier }}</h5>
                    </div>

                    <form id="addetape-form" class="space-y-5">
                        @csrf
                        <div id="tournees-container" class="space-y-5">
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
        window.keyfret = "{{ $keyfret }}";
    </script>

@endsection
