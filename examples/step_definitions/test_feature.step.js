'user strict';

const { defineSupportCode } = require('cucumber');
const usuario = require ('src/support/business-object/usuario.bo');


defineSupportCode(function({Given, When, Then}) {

  Given(/^I'm in the page of search$/, function() {
  // to do something
   return usuario.OpenSearch();

  });
   When(/^I to write a word to search with result ok$/, function() {
     //to do somthing
     return usuario.SearchWordOk();
   }) ;
   Then(/^The result is ok$/, function() {
    // to do something
    return usuario.SeeResultOk();
  });

  When(/^I to write a word to search with result fail$/, function(){
     // to do something
     return usuario.SearchWordNotOk();
  });

  Then(/^The result is not ok$/, function(){
    // to do something

    return usuario.SeeResultNotOk();

  });
});
