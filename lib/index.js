$(document).ready(function(){
  $('.delete-icon').on("click", function(){
    console.log("hello");
  })

  $("#create-food").on("click", function(){
    var foodName = $("input#food-name").val();
    var foodCalories = $("input#food-calories").val();
    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
    var newFoodInfo = foodName + foodCalories + deleteIcon;
    $('.foods-table tr:last').before(newFoodInfo);
    })

});
