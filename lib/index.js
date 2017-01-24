$(document).ready(function(){
  $('.delete-icon').on('click', function() {
    console.log("hello");
  })

  $('#food-filter').on('keyup', function() {
    var food = $('input[id=food-filter]');
    $('tbody > tr').each(function(){
      foodNameFilter(food, $(this))
    });
  });

  function foodNameFilter(food, self) {
    if (food.val() == "") {
      $('tbody').children().show();
    }
    else if (self.children().first().html() == food.val()) {
      self.parent().children().show();
    } else {
      self.hide();
    }
  }

});
