/*
title == titolo del film
voto == voto del film
originalLanguage == lingua originale
originalTitle == Titolo originale
description == testo di overview che viene dato su ajax
*/
function addTitle(title, voto, originalLanguage,originalTitle, description) {
  var tempData = {
    title:title,
    vote: voto,
    originalLanguage: originalLanguage,
    originalTitle: originalTitle,
    description : description
  }

  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempData);

  var ulFilms = $(".film");
  ulFilms.append(li);

}


/*
Chiama API di themoviedb.org
*/
function callAPITheMovieDb(title) {

  var ourData = {
    api_key: "75170e6982d68a1a46623efb2f6ace28",
    language: "it-IT",
    query: title
  };

  $.ajax({
    url:"https://api.themoviedb.org/3/search/movie",
    method:"GET",
    data : ourData,
    success:function(data){
      console.log(data);
      var ress = data.results;

      for (var i = 0; i < ress.length; i++) {

        var res = ress[i];
        var title = res.title;
        var voto = res.vote_count;
        var origLang = res.original_language;
        var originalTitle = res.original_title;
        var overview = res.overview;

        console.log(title);
        console.log(voto);
        console.log(origLang);
        console.log(originalTitle);
        console.log(overview);

        /*chiamata alla funzione che compila handlebars*/
        addTitle(title, voto, origLang, originalTitle, overview);

      }

    },
    error:function(request, state, error ){
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function clear() {

  var titleInputSearch =$("#titleMovieSearch"); //campo di testo
  titleInputSearch.val("");
  var li = $("li");
  li.remove();
}

function init() {

  var btnInput = $("#btnInput"); //button del form
  var titleInputSearch =$("#titleMovieSearch"); //campo di testo
  var title = "";

  btnInput.click(function(){

    title = titleInputSearch.val();
    clear();
    callAPITheMovieDb(title); //chiamata ajax con parametro title(titolo)
  })

  }

$(document).ready(init);
