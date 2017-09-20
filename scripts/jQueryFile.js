$(document).ready(function() {
  console.log('in jQueryFile');

  // toggles the benefits offers
  $(".show").click(function() {
    $(".show").text(($(".show").text() == 'Compare Benefits') ? 'Close' : 'Compare Benefits').fadeIn();
    $('.cardRow').toggleClass('cardRowOpen');
    $('.collapse').collapse({
      toggle: true
    });
  });

}); // end jQuery
