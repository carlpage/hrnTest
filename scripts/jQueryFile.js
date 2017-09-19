$(document).ready(function() {
  console.log('in jQueryFile');
  $('.collapse').collapse({
    toggle: false
  });

  $(".show").click(function () {
    // $(".show").fadeOut(function () {
        $(".show").text(($(".show").text() == 'Compare Benefits') ? 'Expand it' : 'Compare Benefits').fadeIn();
    // })
})


}); // end jQuery
