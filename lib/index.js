Food = require('./food');
Table = require('./table.js');
Exercise = require('./exercise.js');

$(document).ready(function(){
  var table = new Table;
  var food = new Food;
  var exercise = new Exercise;

  table.createTable();

  $('tbody').on('click', '.delete-icon', function(event) {
    event.preventDefault();
    var name = $(this).parent().parent().children().first().html();
    var food = JSON.parse(localStorage.getItem('food'));
    food.forEach(function(object) {
      if (object.name == name) {
        food.splice(food.indexOf(object), 1);
      }
      foodJSON = JSON.stringify(food);
      localStorage.setItem('food', foodJSON);
    })
    $(this).parent().parent().remove()
  })

  $("#create-food").on("click", function(){
    var foodName = $("input#food-name").val();
    var foodCalories = $("input#food-calories").val();
    var message = document.getElementById("message");
    if (foodName === '') { throw message.innerHTML = "Please enter a food name"; }
    if (foodCalories === '') { throw message.innerHTML = "Please enter a calorie amount"; }
    else {
      food.storeNewFood(foodName, foodCalories);
      table.addFoodRow();
      document.getElementById('food-name').value = '';
      document.getElementById('food-calories').value = '';
      document.getElementById('message').innerHTML = '';
  }})

  $("#create-exercise").on("click", function(){
    var exerciseName = $("input#exercise-name").val();
    var exerciseCalories = $("input#exercise-calories").val();
    var message = document.getElementById("exercise-message");
    if (exerciseName === '') { throw message.innerHTML = "Please enter a exercise name"; }
    if (exerciseCalories === '') { throw message.innerHTML = "Please enter a calorie amount"; }
    else {
      debugger;
      exercise.storeNewExercise(exerciseName, exerciseCalories);
      table.addExerciseRow();
      document.getElementById('exercise-name').value = '';
      document.getElementById('exercise-calories').value = '';
      document.getElementById('exercise-message').innerHTML = '';
  }})

  $('tbody').on('dblclick', 'td', function(){
    var self = $(this)
    var cellHtml = $(this).html();
    var nameObject = $(this).parent().children().first()
    var caloriesObject = $(this).parent().children().eq(1)
    var editableText = $("<textarea />");

      var food = JSON.parse(localStorage.food);
      var exercise = JSON.parse(localStorage.exercise)
      if (window.location.pathname == "/foods.html"){
        var foundObject = getObject(food, nameObject.html())
      }
      if (window.location.pathname == "/exercises.html"){
        var foundObject = getObject(exercise, nameObject.html())
      }
    editableText.val(cellHtml);
    $(this).replaceWith(editableText);
    editableText.focus();

    if (window.location.pathname == "/foods.html") {
      var iterationObject = food;
    }
    else {
      var iterationObject = exercise;
    }
    editableText.on('blur', function() {
      iterationObject.forEach(function(object) {
        if (object.name == foundObject.name && self.html() === nameObject.html()) {
          object.name = editableText.val();
        } else if (object.name == foundObject.name && self.html() === caloriesObject.html()) {
          object.calories = editableText.val();
        }
      })
    if (window.location.pathname == "/foods.html") {
        var foodJSON = JSON.stringify(food)
        localStorage.setItem('food', foodJSON)
        editableText.replaceWith('<td>'+editableText.val()+'</td>')
      }
     if (window.location.pathname == "/exercises.html"){
      var exerciseJSON = JSON.stringify(exercise);
      localStorage.setItem('exercise', exerciseJSON);
      editableText.replaceWith('<td>'+editableText.val()+'</td>')
    }
    });
  });


  $('#food-filter').on('keyup', function() {
    var rows = $("tbody").find("tr")
    var filterValue = this.value.toLowerCase()
    var filtered = []

    rows.hide()
    if (filterValue.length) {
        rows.each(function() {
          if ($(this).children().first().html().toLowerCase().includes(filterValue)) {
            $(this).show();
          };
        })
    } else {
      rows.show();
    }
  });

  $('#exercise-filter').on('keyup', function() {
    var food = $('input[id=exercise-filter]').val().toLowerCase();
    $('tbody > tr').each(function(){
      exerciseNameFilter(food, $(this))
    });
  });


  function foodNameFilter(food, self) {
    if (food == "") {
      $('tbody').children().show();
    }
    else if (self.children().first().html().toLowerCase() == food) {
      self.show();
    } else {
      rows.show();
    }
  };

  function exerciseNameFilter(food, self) {
    if (food == "") {
      $('tbody').children().show();
    }
    else if (self.children().first().html().toLowerCase() == food) {
      self.show();
    } else {
      self.hide();
    }
  }
  $('form').submit(function(e){
    e.preventDefault();
  })

});

function getObject(food, value) {
  var foundObject = {}
  food.forEach(function(object) {
    if (object.name == value) {
      foundObject = object
    }
  })
  return foundObject;
}
