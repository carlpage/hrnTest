$(document).ready(function() {
  console.log('in jQueryFile');

  // toggles the benefits offerings
  $(".show").click(function() {
    // changes text on button click
    $(".show").text(($(".show").text() == 'COMPARE BENEFITS') ? 'CLOSE' : 'COMPARE BENEFITS').fadeIn();
    // toggles increased row height on button click. Otherwise the toggled properties overlap
    $('.cardRow').toggleClass('cardRowOpen');
    // bootstrap collapse class
    $('.collapse').collapse({
      toggle: true
    });
  }); // end show on click

}); // end jQuery
