$(document).ready(function(){
  $('.delete-icon').on('click', function() {
    console.log("hello");
  })
  $('#food-filter').on('keyup', function(e) {
    var food = $('input[id=food-filter]');
    if (e.keyCode == 8 && food.val() == "") {
      $('tbody').children().show()
    } else {
      $('tbody > tr').each(function(e){
        if ($(this).children().first().html() == food.val()) {
          $(this).parent().children().show();
        } else {
          $(this).hide();
        }
      });
    }
  });
});
