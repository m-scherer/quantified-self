$(document).ready(function(){
  $('.delete-icon').on('click', function() {
    console.log("hello");
  })


  $('#food-filter').on('keyup', function() {
    var food = $('input[id=food-filter]').val().toLowerCase();
    $('tbody > tr').each(function(){
      foodNameFilter(food, $(this))
    });
  });

  function foodNameFilter(food, self) {
    if (food == "") {
      $('tbody').children().show();
    }
    else if (self.children().first().html().toLowerCase() == food) {
      self.show();
    } else {
      self.hide();
    }
  }

  $("#create-food").on("click", function(){
    var foodName = $("input#food-name").val();
    var foodCalories = $("input#food-calories").val();
    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
    var newFoodInfo = foodName + foodCalories + deleteIcon;
    $('.foods-table tr:last').before(newFoodInfo);
    })

});
