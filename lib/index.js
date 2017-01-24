$(document).ready(function(){

  $('.delete-icon').on('click', function() {
    console.log("hello");
  })

  $("#create-food").on("click", function(){
    var foodName = $("input#food-name").val();
    var foodCalories = $("input#food-calories").val();
    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
    var newFoodInfo = foodName + foodCalories + deleteIcon;
    $('.foods-table tr:last').before(newFoodInfo);
    storeNewFood(foodName, foodCalories);
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

  function storeNewFood(foodName, foodCalories) {
    var foodJSON = localStorage.getItem('food')

    if (foodJSON == null) {
      foodJSON = '[]';
    }
    var currentFood = JSON.parse(foodJSON);

    currentFood.push( {name: foodName, calories: foodCalories} );

    foodJSON = JSON.stringify(currentFood);
    localStorage.setItem('food', foodJSON);
  }

});
