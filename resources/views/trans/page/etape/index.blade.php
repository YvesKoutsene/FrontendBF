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
                <div class="mb-5 flex items-center justify-center">
                    <h5 id="numeroTournee" class="text-lg font-semibold dark:text-white-light"></h5>
                </div>
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                    <div>
                      <label for="entries-select" class="text-sm font-medium text-gray-700">Nombre d'entrées
                          <select id="entries-select" class="ml-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                            <option value="10" selected>10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                       </label>
                    </div>
                    <div class="relative w-full sm:w-64">
                        <input type="text" id="search-input" placeholder="Rechercher ici..." class="form-input shadow-[0_0_4px_2px_rgb(31_45_61/_10%)] bg-white rounded-full h-11 pl-10 pr-4 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                           <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                   <path d="M12.9 14.32A7.5 7.5 0 1 0 14.32 12.9l3.7 3.7a1 1 0 0 0 1.42-1.42l-3.7-3.7zM10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                               </svg>
                           </div>
                    </div>
                </div>
                <div class="mb-5">
                    <div class="overflow-auto rounded-lg shadow mb-4 table-responsive">
                        <table class="min-w-full text-sm text-left border border-gray-200 table-hover whitespace-nowrap" id="myTable">
                            <thead class="bg-gray-50 font-medium text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 border">#</th>
                                    <th class="px-4 py-2 border">Position</th>
                                    <th class="px-4 py-2 border">Longitude</th>
                                    <th class="px-4 py-2 border">Latitude</th>
                                    <th class="px-4 py-2 border">Date position</th>
                                    <th class="px-4 py-2 border text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="etapes-body">
                            </tbody>
                            <tfoot class="bg-gray-50 font-medium text-gray-700">
                                <tr>
                                    <th class="px-4 py-2 border">#</th>
                                    <th class="px-4 py-2 border">Position</th>
                                    <th class="px-4 py-2 border">Longitude</th>
                                    <th class="px-4 py-2 border">Latitude</th>
                                    <th class="px-4 py-2 border">Date position</th>
                                    <th class="px-4 py-2 border text-center">Actions</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div id="pagination-container" class="flex flex-wrap gap-2 justify-end mt-2"></div>
                </div>
            </div>
        </div>
    </div>

 <script>
        window.keytournee = "{{ $keytournee }}";
 </script>

@endsection
