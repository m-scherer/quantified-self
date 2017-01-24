$(document).ready(function(){
  $('.delete-icon').on('click', function() {
    console.log("hello");
  })
  $('#food-filter').on('keyup', function() {
    var food = $('input[id=food-filter]');
      $('tbody > tr').each(function(){
        if (food.val() == "") {
          $('tbody').children().show()
        }
        else if ($(this).children().first().html() == food.val()) {
          $(this).parent().children().show();
        } else {
          $(this).hide();
        }
      });
    // }
  });
});
