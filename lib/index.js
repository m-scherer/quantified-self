$(document).ready(function(){
  $('.delete-icon').on("click", function(){
    console.log("hello");
  })

  $("#create-food").on("click", function(){
    var foodName = $("input#food-name").val();
    var foodCalories = $("input#food-calories").val();
    var foodInfo = foodName + foodCalories;
    $('.foods-table tr:last').before(foodInfo);
    })

});
