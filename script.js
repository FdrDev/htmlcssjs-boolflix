/*
title == titolo del film
starIcon == restituisce un html con detro le stelle
originalLanguage == lingua originale
originalTitle == Titolo originale
description == testo di overview che viene dato su ajax
*/
function addTitleFilm(title, starIcon, originalLanguage, originalTitle, description, complPoster) {
  var tempData = {
    poster: complPoster,
    title:title,
    stars: starIcon,
    originalLanguage: originalLanguage,
    originalTitle: originalTitle,
    description : description
  }

  var template = $("#film-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempData);

  var ulFilms = $(".film");
  ulFilms.append(li);

}

/*
title == titolo del film
starIcon == restituisce un html con detro le stelle
originalLang == lingua originale
originalTitle == Titolo originale
overview == testo di overview che viene dato su ajax
*/
function addTitleSeries(title, starIcon, origLang, originalTitle, overview, complPoster){
  var tempData = {
    poster: complPoster,
    name: title,
    stars : starIcon,
    originalLanguage : origLang,
    originalTitle: originalTitle,
    description : overview
  }

  var template = $("#serie-template").html();
  var compiled = Handlebars.compile(template);
  var li = compiled(tempData);

  var ulSeries = $(".serie-tv");
  ulSeries.append(li);
}
/*
Chiama API di themoviedb.org per FILM
*/
function callAPITheMovieDbFilm(title) {

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
      var ress = data.results;

      for (var i = 0; i < ress.length; i++) {

        var res = ress[i];
        var title = res.title;
        var voto = res.vote_average;
        var votoInStelle = numbOfStars(voto);
        var origLang = res.original_language;
        var originalTitle = res.original_title;
        var overview = res.overview;
        var poster = res.poster_path;
        var complPoster = "<img class="+ "posterImg"+ " " +"src=" + "https://image.tmdb.org/t/p/w300" + poster + " " + "alt=''/>";
        console.log(complPoster);

        // chiamata per aggiugere le stelline
        var starIcon = addStarsIcon(votoInStelle);
        //chiamata per la bandierina
        var flag = getFlag(origLang);

        /*chiamata alla funzione che compila handlebars*/
        addTitleFilm(title, starIcon, flag, originalTitle, overview, complPoster);
      }

    },
    error:function(request, state, error ){
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

/*
Chiama API di themoviedb.org per SERIE TV
*/
function callAPITheMovieDbSeries(title){
  var ourData = {
    api_key: "75170e6982d68a1a46623efb2f6ace28",
    language: "it-IT",
    query: title
  }

  $.ajax({
    url:"https://api.themoviedb.org/3/search/tv",
    method:"GET",
    data : ourData,
    success:function(data){
      var ress = data.results;
      for (var i = 0; i < ress.length; i++) {
        var res = ress[i];

        var title = res.name;
        var voto = res.vote_average;
        var votoInStelle = numbOfStars(voto);
        var origLang = res.original_language;
        var originalTitle = res.original_name;
        var overview = res.overview;
        var poster = res.poster_path;
        var complPoster = "<img class="+ "posterImg"+ " " +"src=" + "https://image.tmdb.org/t/p/w300" + poster + " " + "alt=''/>";
        var id = res.id;

        console.log("QUESTO È L'ID" + id);

        // chiamata per aggiugere le stelline
        var starIcon = addStarsIcon(votoInStelle);
        //chiamata per la bandierina
        var flag = getFlag(origLang);

        getCast(id);

        addTitleSeries(title, starIcon, flag, originalTitle, overview, complPoster);

      }

    },
    error:function(request, state, error ){
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });
}

function getID(id) {
    var url = "https://api.themoviedb.org/3/movie/";
    var iD = id;
    var finalHTML = url + id + "/credits";

    return finalHTML;
}

function getCast(id){
  var ourData = {
    api_key:"75170e6982d68a1a46623efb2f6ace28"
  }

  $.ajax({
    url: getID(id),
    method:"GET",
    data : ourData,
    success:function(data){
      var ress = data.cast;
      console.log(ress);
    },
    error:function(request, state, error ){
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  })
}

/*
Chiamata per film popolari
*/
function getPopularMovie() {

  var ourData = {
    api_key: "75170e6982d68a1a46623efb2f6ace28",
    language: "it-IT",
  }

  $.ajax({
    url:"https://api.themoviedb.org/3/movie/popular",
    method:"GET",
    data : ourData,
    success:function(data){
      var ress = data.results;
      for (var i = 0; i < ress.length; i++) {
        var res = ress[i];

        var title = res.title;
        var voto = res.vote_average;
        var votoInStelle = numbOfStars(voto);
        var origLang = res.original_language;
        var originalTitle = res.original_title;
        var overview = res.overview;
        var poster = res.poster_path;
        var complPoster = "<img class="+ "posterImg"+ " " +"src=" + "https://image.tmdb.org/t/p/w300" + poster + " " + "alt=''/>";

        // var id = res.id;
        //
        // console.log("QUESTO È L'ID" + id);

        // chiamata per aggiugere le stelline
        var starIcon = addStarsIcon(votoInStelle);
        //chiamata per la bandierina
        var flag = getFlag(origLang);

        addTitleFilm(title, starIcon, flag, originalTitle, overview, complPoster);

      }

    },
    error:function(request, state, error ){
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });

}

/*
Chiamata per serie popolari
*/
function getPopularSeries() {

  var ourData = {
    api_key: "75170e6982d68a1a46623efb2f6ace28",
    language: "it-IT",
  }

  $.ajax({
    url:"https://api.themoviedb.org/3/tv/top_rated",
    method:"GET",
    data : ourData,
    success:function(data){
      var ress = data.results;
      for (var i = 0; i < ress.length; i++) {
        var res = ress[i];

        var title = res.name;
        var voto = res.vote_average;
        var votoInStelle = numbOfStars(voto);
        var origLang = res.original_language;
        var originalTitle = res.original_name;
        var overview = res.overview;
        var poster = res.poster_path;
        var complPoster = "<img class="+ "posterImg"+ " " +"src=" + "https://image.tmdb.org/t/p/w300" + poster + " " + "alt=''/>";

        // var id = res.id;
        //
        // console.log("QUESTO È L'ID" + id);

        // chiamata per aggiugere le stelline
        var starIcon = addStarsIcon(votoInStelle);
        //chiamata per la bandierina
        var flag = getFlag(origLang);

        addTitleSeries(title, starIcon, flag, originalTitle, overview, complPoster);

      }

    },
    error:function(request, state, error ){
      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    }
  });

}

/*
Permette di avviare la ricerca anche premendo invio
*/
function searchByEnter(e){
  if(e.keyCode!=13){
    return
  }

  var titleInputSearch =$("#titleMovieSearch"); //campo di testo
  var title = "";
  title = titleInputSearch.val();
  clear();
  callAPITheMovieDbFilm(title);
  callAPITheMovieDbSeries(title);
}

/*
Calcola il numer di stelle
*/
function numbOfStars(voto){
  var numbOfStar = Math.round(voto/2);
  console.log(numbOfStar);
  return numbOfStar;
}

/*
Restituisce un html con il fontawesome delle stelle. Calcola in automatico quali piene e quali vuote
voto== il voto delle stelle piene
*/
function addStarsIcon(voto) {
  var stars = "";

  for (var i = 1; i <= 5; i++) {
    if (voto >= i) {

      stars += "<i class='fas fa-star'></i>";
    } else {

      stars += "<i class='far fa-star'></i>";
    }
  }
  return stars;
}

/*
Assegna le bandierine della nazione
*/
function getFlag(origLang) {
  var html = ""

  switch (origLang) {
    case "en": html = "imgs/en.png"
    break;
    case "it": html = "imgs/it.png"
    break;
    case "us": html = "imgs/us.png"
    break;
    default: html = "imgs/unknow.png"
  }

  return html;
}

function scrollingArrowRightFilm() {
  $(".film").animate({scrollLeft: "+=300"}, 800);
}

function scrollingArrowLeftFilm() {
  $(".film").animate({scrollLeft: "-=300"}, 800);
}

function scrollingArrowRightSerie() {
  $(".serie-tv").animate({scrollLeft: "+=300"}, 800);
}

function scrollingArrowLeftSerie() {
  $(".serie-tv").animate({scrollLeft: "-=300"}, 800);
}

/*
Mostra la descrizione al passaggio del mouse
*/
function hoverForOverview(me){
 var me = $(this);
 var description = me.find(".descriptionOver");
 description.toggleClass("show");
 var foto = me.find(".posterImg");
 me.toggleClass("big");
 foto.toggleClass("big");

 var arrow = $(".arrowLeft,.arrowRight");
 arrow.toggleClass("zIndexVariation");
}

/*
pulisce la schermata ad ogni ricerca
*/
function clear() {

  var titleInputSearch =$("#titleMovieSearch"); //campo di testo
  titleInputSearch.val("");
  var li = $(".locandina,.descriptionOver");
  li.remove();
}


function init() {

  var btnInput = $("#btnInput"); //button del form
  var titleInputSearch =$("#titleMovieSearch"); //campo di testo
  var title = "";
  var locandina = $(".locandina");

  //ricerca tramite click su button
  btnInput.click(function(){
    console.log("click button ok");
    title = titleInputSearch.val();
    clear();
    callAPITheMovieDbFilm(title); //chiamata ajax con parametro title(titolo)
    callAPITheMovieDbSeries(title);
  });

  //ricerca premendo invio
  titleInputSearch.on("keyup", searchByEnter);

  //mostra film popolari all'avvio
  getPopularMovie();
  getPopularSeries();

  /*Mostra la descrizione al passaggio del mouse*/
  $(document).on("mouseenter",".locandina",hoverForOverview);
  $(document).on("mouseleave",".locandina",hoverForOverview);

  /*Scrolling*/
  $(document).on("click", ".wrapper-film>.arrowRight", scrollingArrowRightFilm);
  $(document).on("click", ".wrapper-film>.arrowLeft", scrollingArrowLeftFilm);

  $(document).on("click", ".wrapper-serie>.arrowRight", scrollingArrowRightSerie);
  $(document).on("click", ".wrapper-serie>.arrowLeft", scrollingArrowLeftSerie);

  /*cast*/
  $(document).on("click",".descriptionOver",getCast);


}


$(document).ready(init);
