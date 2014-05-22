
/* INDEX 													*/

/* 1 - layout												*/
/* 2 - tableau issues : selection  							*/
/* 3 - tableau issues : présélections particulières 		*/
/* 4 - tableau issues : controles fins par ligne 			*/
/* 5 - dropdown 											*/
/* 6 - live filter 											*/


$( document ).ready(function() {
  actionMenu();
});

/**********/
/* Layout */
/**********/

/* controle l'affichage des actions de la barre de menu */
function actionMenu() {
  // si au moins une sélection
  if ($(".table-issues tr.selected").length > 0) {
    $("div.action-select").addClass("isInBloVisible");
    // si pas tous sélectionnés
    if ($(".table-issues tr.selected").length < $(".table-issues tbody tr").length) /* le .selected compte aussi le check-all*/
    {
      $(".action-perm .check-all .check").addClass("is-partial");
      $(".action-perm .check-all .check").removeClass("is-checked");
    }
    else {
      $(".action-perm .check-all .check").addClass("is-checked");
      $(".action-perm .check-all .check").removeClass("is-partial");
    }
  }
  else {
    $("div.action-select").removeClass("isInBloVisible");
    $(".action-perm .check-all .check").removeClass("is-partial");
  };
}

/* ombrage sous le bandeau d'action lors d'un scroll down */
$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $(".actions-menu").addClass("sticky");
  }
  else { $(".actions-menu").removeClass("sticky"); }
});

/* changement de compacité pour la vue : gestion du menu */

$("#view-normal").click(function() {
  $(".table-issues").addClass("normal-table").removeClass("compact-table comfortable-table");
  if (!$(this).hasClass("selected-item")) {
    $("div[data-group='view-density']").removeClass("selected-item");
    $(this).addClass("selected-item");
  }
});

$("#view-compact").click(function() {
  $(".table-issues").addClass("compact-table").removeClass("normal-table comfortable-table");
  if (!$(this).hasClass("selected-item")) {
    $("div[data-group='view-density']").removeClass("selected-item");
    $(this).addClass("selected-item");
  }
});

$("#view-comfortable").click(function() {
  $(".table-issues").addClass("comfortable-table").removeClass("normal-table compact-table");
  if (!$(this).hasClass("selected-item")) {
    $("div[data-group='view-density']").removeClass("selected-item");
    $(this).addClass("selected-item");
  }
});

/* outline sur le champs de recherche */
$('input.search-input').on('focus', function () {
  $(this).parent().parent().addClass('isFocused');
});

$('input').on('focusout', function () {
  $(this).parent().parent().removeClass('isFocused');
});


/******************************/
/* tableau issues : selection */
/******************************/

function selectAllTableLine() {
  $(".action-perm .check-all .check").removeClass("is-partial").addClass("is-checked");
  $(".table-issues .check").addClass("is-checked");
  $(".table-issues tr").addClass("selected");
}

function selectNoTableLine() {
  $(".action-perm .check-all .check").removeClass("is-partial, is-checked");
  $(".table-issues .check").removeClass("is-checked");
  $(".table-issues tr").removeClass("selected");
}

/* selection d'une ligne d'un tableau */
$(".table-issues div.check").click(function(){
  $(this).closest("tr").toggleClass("selected");
  $(this).toggleClass("is-checked");
  actionMenu();
});

/* raccourci de sélection générale */
$("div.check-all").click(function(e){
  e.stopPropagation();											/* sinon je choppe aussi le click sur l'action */
  if ($(".action-perm .check-all .check").hasClass("is-checked") || $(".action-perm .check-all .check").hasClass("is-partial") ) {
    selectNoTableLine();
    closeAllSubMenus();
  }
  else
  {
    selectAllTableLine();
  }
  actionMenu();
});


/* menu de présélection généraux */
$("#select-all").click(function(){
  selectAllTableLine();
  actionMenu();
});

$("#select-none").click(function(){
  selectNoTableLine();
  actionMenu();
});


/************************************************/
/* tableau issues : présélections particulières */
/************************************************/

$("#select-isHigh").click(function(){
  selectNoTableLine();
  $(".table-issues tr:has(.isHigh)").addClass("selected");
  $(".table-issues tr:has(.isHigh) .check").addClass("is-checked");
  actionMenu();
});

$("#select-isMedium").click(function(){
  selectNoTableLine();
  $(".table-issues tr:has(.isMedium)").addClass("selected");
  $(".table-issues tr:has(.isMedium) .check").addClass("is-checked");
  actionMenu();
});

$("#select-isLow").click(function(){
  selectNoTableLine();
  $(".table-issues tr:has(.isLow)").addClass("selected");
  $(".table-issues tr:has(.isLow) .check").addClass("is-checked");
  actionMenu();
});

$("#select-isIncident").click(function(){
  selectNoTableLine();
  $(".table-issues tr:has(td:nth-child(3):contains('Incident'))").addClass("selected");
  $(".table-issues tr:has(td:nth-child(3):contains('Incident')) .check").addClass("is-checked");
  actionMenu();
});

$("#select-isNew").click(function(){
  selectNoTableLine();
  $(".table-issues tr:has(.zero)").addClass("selected");
  $(".table-issues tr:has(.zero) .check").addClass("is-checked");
  actionMenu();
});

$("#select-fav").click(function(){
  selectNoTableLine();
  $(".table-issues tr:has(.fav[data-icon='S'])").addClass("selected");
  $(".table-issues tr:has(.fav[data-icon='S']) .check").addClass("is-checked");
  actionMenu();
});

$("#select-myIssues").click(function(){
  $(".table-issues div.check").closest("tr").removeClass("selected");
  $(".table-issues tr td:last-child:contains('M. Goepp')").closest("tr").addClass("selected");
  actionMenu();

  selectNoTableLine();
  $(".table-issues tr:has(td:last-child:contains('M. Goepp'))").addClass("selected");
  $(".table-issues tr:has(td:last-child:contains('M. Goepp')) .check").addClass("is-checked");
  actionMenu();
});

/*********************************************/
/* tableau issues : controles fins par ligne */
/*********************************************/

/* toggle bouton favori */
$("span.fav").click(function(){
  $(this).attr("data-icon", $(this).attr("data-icon") == "s" ? "S" : "s");
});

/* toggle triple priorité */
$("span.prior").click(function () {
  if ($(this).hasClass('isLow')) {
    $(this).removeClass("isLow").addClass('isMedium');   /* click 1: works*/
  } else if ( $(this).hasClass('isMedium')) {
    $(this).removeClass('isMedium').addClass('isHigh'); /* click 2: doesn't*/
  } else {
    $(this).removeClass('isHigh').addClass('isLow'); /* click 2: doesn't*/
  }
});


/************/
/* dropdown */
/************/

$('.list-trigger').on('click', openOptionList);
$('.menu-trigger').on('click', openSubMenu);
$(".menuitem").hover(function(){ $(".menuitem").removeClass("is-hover"); $(this).addClass("is-hover");  }, function(){ $(".menuitem").removeClass("is-hover");});

function openSubMenu() {

  var $parent = $(this).parent();

  if ($parent.hasClass("open") == true) { closeAllSubMenus(); return false; }
  else {
    closeAllSubMenus();
    $parent.addClass('open');
    console.log("ouverture du menu");
    $(this).children('div.menuitem').click(function(e) { e.stopPropagation(); })
    $(".unclickable, .formarea, .action-item").click(function(e) { e.stopPropagation(); }) /* je ne ferme pas les menus sur click sur les items qui sont unclickable ou les formarea*/
    $(document).one('click', {button: $(this)}, function() { closeAllSubMenus(); }); /* fermeture sur n'importe quel autre click */
    $parent.find("input.invisible-input").focus();
    return false;
  }
}

function openOptionList(event) {

  initSelectedOptions($(this));

  var $parent = $(this).parent();

  if ($parent.hasClass("open") == true) { closeAllOptionsMenus(); return false; }
  else {
    closeAllOptionsMenus();
    $parent.addClass('open');
    setCheckAllState($(this).parent().find(".listWrapper"));
    $(".dropdown-list.has-multiselectable-items, .dropdown-list.has-selectable-items, .check-in").click(function(e) { e.stopPropagation(); }) /* je ne ferme pas sur un check-in : c'est forcément une sélection multiple*/
    console.log("ouverture de la liste");
    $parent.find("input.invisible-input").focus();
    return false;
  }
}

function initSelectedOptions(selection){
  $.each(selection.closest('.has-dropdown').find('.menuitem-content > span'), function(){
    if($.inArray($(this).html(), filter_authors) > -1){
      $(this).closest('.menuitem').find('.check').addClass('is-checked');
    }else{
      $(this).closest('.menuitem').find('.check').removeClass('is-checked');
    }
  });

}

function closeAllSubMenus() {
  $(".menu-trigger").parents(".has-dropdown").find("input").val("");
  $(".menu-trigger").parents(".has-dropdown").removeClass('open');
  $(".menu-trigger").parents(".has-dropdown").find(".menuitem").removeClass("is-hover");
  console.log("fermeture des menus");
  closeAllOptionsMenus()
}

function closeAllOptionsMenus() {
  /* change l'état global du drop-down */
  $(".list-trigger").closest(".has-dropdown").removeClass('open');
  $(".list-trigger").closest(".has-dropdown").find(".menuitem").removeClass("is-hover");

  /* efface les traces d'une recherche éventuelle */
  $(".list-trigger").closest(".has-dropdown").find("input").val("");
  $(".list-trigger").closest(".has-dropdown").find(".menuitem.data-test").show();
  $(".list-trigger").closest(".has-dropdown").find(".check-in-all").show();

  /* reinitialise le bouton d'application des changements */
  $(".list-trigger").closest(".has-dropdown").find(".set-values").hide();
  $(".list-trigger").closest(".has-dropdown").find(".comment-label").show();

  console.log("fermeture des listes");
}

/* selection d'une valeur dans une liste mono-valuée */
$('.has-selectable-items .data-test.menuitem').on('click', function() {
  $(this).closest(".listWrapper").find(".data-test").removeClass("selected-item");
  console.log("selection");
  $(this).addClass("selected-item");
  $(this).parent().siblings('div.select-list')[0].firstChild.data = $(this).children('.menuitem-content').children('span').text() + " ";
  closeAllOptionsMenus();
} );

/* selection d'une valeur dans une liste multi-valuée : depuis un label */
$('.has-multiselectable-items .data-test.menuitem').on('click', function() {
  $(this).find(".check").toggleClass("is-checked");
  closeAllOptionsMenus();
  var selector = $(this).closest(".listWrapper");
  setSelectLabel(selector);
  setCurrentFilters(selector);
} );

/* selection d'une valeur dans une liste multi-valuée : depuis une checkbox */
$(".check-in").click(function(){
  $(this).children(".check").toggleClass("is-checked");
  console.log("selection multiple depuis check-box");
  var selector = $(this).closest(".listWrapper");
  selector.find(".set-values").show();
  selector.find(".comment-label").hide();
  setCheckAllState(selector);
});

/* sélection globale */
$(".check-in-all").click(function(e){
  if ($(this).children(".check").hasClass("is-checked") || $(this).children(".check").hasClass("is-partial") ) {
    $(this).closest(".listWrapper").find(".vSlider .check").removeClass("is-checked");
    $(this).children(".check").filter(':visible').removeClass("is-checked is-partial");
    console.log("déselection générale");
  }
  else
  {
    $(this).closest(".listWrapper").find(".vSlider .check").addClass("is-checked");
    $(this).children(".check").filter(':visible').addClass("is-checked");
    console.log("selection générale");
  }

  $(this).closest(".listWrapper").find(".set-values").show();
  $(this).closest(".listWrapper").find(".comment-label").hide();

});

/* controle l'état du bouton de sélection globale */

function setCheckAllState(selector) {

  selector.hasClass(".listWrapper") ? selector = selector : selector = selector.closest(".listWrapper");

  var totalvalues = selector.find(".check-in > .check").length;
  var selectedvalues = selector.find(".check-in > .is-checked").length;

  console.log("selectedvalues=" + selectedvalues);
  console.log("totalvalues=" + totalvalues);

  if ( selectedvalues < 1 )
  { selector.find(".check-in-all > .check").removeClass("is-checked").removeClass("is-partial");
    console.log("aucune valeur");			}
  else if ( selectedvalues == totalvalues )
  { selector.find(".check-in-all > .check").removeClass("is-partial").addClass("is-checked"); console.log("toutes sélectionnées"); }
  else
  { selector.find(".check-in-all > .check").removeClass("is-checked").addClass("is-partial"); console.log("sélection partielle");	}
}

/* action : application sélection multiple */
$(".set-values").on('click', function() {
  var selector = $(this).parent();
  setSelectLabel(selector);
  setCurrentFilters(selector);
  closeAllOptionsMenus();
  console.log("setSelectLabel");
});

/* calcul du label du trigger après validation de la sélection */
function setSelectLabel(selector) {
  if (selector.find(".vSlider .is-checked").length == 0) {
    selector.siblings('div.select-list')[0].firstChild.data = selector.prev('.list-trigger').attr('data-selection-label');
    console.log("aucune selection");
  }
  else if (selector.find(".vSlider .is-checked").length == 1) {
    selector.siblings('div.select-list')('div.select-list')[0].firstChild.data = selector.find(".menuitem:has(.is-checked) .menuitem-content > span").html() + " ";
    console.log("une selection");
  }
  else {
    selector.siblings('div.select-list')[0].firstChild.data = selector.find(".vSlider .is-checked").length + " selections ";
    console.log("selection multiple");
  }
}

/* enregistrement des filtres sélectionnés */
var filter_authors = [];
function setCurrentFilters(selector) {
  if (selector.children().attr('id') === 'filter-select-list-authors'){
    // enregistrement du filtre "Auteurs"
    filter_authors = [];
    $.each(selector.find(".vSlider .is-checked"), function( ){
      filter_authors.push($(this).closest('.menuitem').find('.menuitem-content > span').html());
    });
  }
}

/* mise en valeur des checkbox par lot */
$(".has-multiselectable-items .action-item").hover(function() { $(this).parent().find(".check").addClass("check-hover"); }, function() {$(this).parent().find(".check").removeClass("check-hover");});

/* selection d'un filtre du panneau de recherche */
$(".invisible-table td > div.check").click(function(){
  ToggleSearchFilter($(this));
});

$('.formarea').on('click', closeAllOptionsMenus);

function ToggleSearchFilter(selector) {
  selector.toggleClass("is-checked");
  selector.closest("tr").toggleClass("selected");
  console.log("toggle d'un filtre");
}


/***************/
/* live filter */
/***************/

/*$('#filter-authors, #filter-projects').keyup(function(){
 var valThis = $(this).val().toLowerCase();
 $(this).closest(".listWrapper").find('.vSlider > .menuitem:not(:has(.is-checked))').each(function(){
 var text = $(this).text().toLowerCase();
 (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
 });
 });*/

$(function() {
  $('#filter-authors').fastLiveFilter('#authors-list');
  $('#filter-projects').fastLiveFilter('#projects-list');
});

/**
 * fastLiveFilter jQuery plugin 1.0.3
 *
 * Copyright (c) 2011, Anthony Bush
 * License: <http://www.opensource.org/licenses/bsd-license.php>
 * Project Website: http://anthonybush.com/projects/jquery_fast_live_filter/
 **/

jQuery.fn.fastLiveFilter = function(list, options) {
  // Options: input, list, timeout, callback
  options = options || {};
  list = jQuery(list);
  var input = this;
  var lastFilter = '';
  var timeout = options.timeout || 0;
  var callback = options.callback || function() {};

  var keyTimeout;

  // NOTE: because we cache lis & len here, users would need to re-init the plugin
  // if they modify the list in the DOM later.  This doesn't give us that much speed
  // boost, so perhaps it's not worth putting it here.
  var lis = list.children();
  var len = lis.length;
  var oldDisplay = len > 0 ? lis[0].style.display : "block";
  callback(len); // do a one-time callback on initialization to make sure everything's in sync

  input.change(function() {

    // var startTime = new Date().getTime();
    var filter = input.val().toLowerCase();
    var li, innerText;
    var numShown = 0;
    for (var i = 0; i < len; i++) {
      li = lis[i];
      innerText = !options.selector ?
        (li.textContent || li.innerText || "") :
        $(li).find(options.selector).text();

      if (innerText.toLowerCase().indexOf(filter) >= 0) {
        if (li.style.display == "none") {
          li.style.display = oldDisplay;
        }
        numShown++;
      } else {
        if (li.style.display != "none") {
          li.style.display = "none";
        }
      }
    }
    callback(numShown);
    // var endTime = new Date().getTime();
    // console.log('Search for ' + filter + ' took: ' + (endTime - startTime) + ' (' + numShown + ' results)');
    return false;
  }).keydown(function() {
    clearTimeout(keyTimeout);
    keyTimeout = setTimeout(function() {
      if( input.val() === lastFilter ) return;
      lastFilter = input.val();
      input.change();

      // ajout personnel pour faire disparaitre la case de sélection générale dés qu'il y a une valeur de filtre
      if ( input.val() == "" ) { input.closest(".menuitem").find(".check-in-all").show(); } else { input.closest(".menuitem").find(".check-in-all").hide(); }

    }, timeout);
  });
  return this; // maintain jQuery chainability
}

/* keyboard controls
 27 - escape
 37 - left
 38 - up
 39 - right
 40 - down
 */

$("#search").keydown(function(e){
  if (e.keyCode == 40) {
    $(this).closest(".search-fieldset").find(".menu-trigger").trigger("click");
    return false;
  }

  if (e.keyCode == 38) {
    $(this).closest(".search-fieldset").find(".menu-trigger").trigger("click");
    return false;
  }
});

$(document).keydown(function(e){
  if (e.keyCode == 27) {
    $(".open").length > 1 ? closeAllOptionsMenus() : closeAllSubMenus();
    return false;
  }

  if (e.keyCode == 40) {
    if ($(".open").length > 0)
    {
      if ($(".open .menuitem.is-hover").length == 0 )
      { $(".open .menuitem").first().toggleClass("is-hover"); }
      else {
        var currentItem = $(".open .menuitem.is-hover");
        //currentItem.next(".menuitem:not(.selected-item)").toggleClass("is-hover");
        currentItem.next(".menuitem").toggleClass("is-hover");
        currentItem.toggleClass("is-hover");
      }
    }
    else { alert("pas de menu ouvert");}

    return false;
  }
});

var authors = [];
