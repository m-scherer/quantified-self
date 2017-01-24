$(document).ready(function(){
  $('.delete-icon').on("click", function(){
    console.log("hello");
  })

  $("#create-food").on("click", function(){
    console.log($("input#food-name").val(),$("input#food-calories").val());
  })


});
