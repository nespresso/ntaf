'user strict';

const pageSearch = require('src/support/page-object/page_search');
// Definir la Clase
const reload = require('require-reload')(require);
reload.emptyCache();

 class Usuario {

   OpenSearch() {
      return pageSearch.OpenSearch();

   }

   SearchWordOk() {

     return pageSearch.SearchWord('happiness');

   }

   SearchWordNotOk(){

     return pageSearch.SearchWord('banana');

   }

   SeeResultOk(){

     return pageSearch.SeeResultOk();

   }

   SeeResultNotOk(){

    return pageSearch.SeeResultNotOk();
   }

 }

const usuario  = new Usuario();
module.exports = usuario;
