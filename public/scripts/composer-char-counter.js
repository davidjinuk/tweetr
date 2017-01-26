$(document).ready(function() {
  let max = 140;
  $("textarea").keyup(function() {
    var textLength = $(this).val().length;
    var textRemaining = max - textLength;

    $("span.counter").text(textRemaining);
    if (textRemaining < 0) {
      $("span.counter").css("color", "red");
    } else {
      $("span.counter").css("color", "black");
    }
  });
});