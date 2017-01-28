Food = require('./food');
Table = require('./table.js');

$(document).ready(function(){
  var table = new Table;
  var food = new Food;

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

  $('tbody').on('dblclick', 'td', function(){
    var self = $(this)
    var cellHtml = $(this).html();
    var foodNameObject = $(this).parent().children().first()
    var foodCaloriesObject = $(this).parent().children().eq(1)
    var editableText = $("<textarea />");
    var food = JSON.parse(localStorage.food);
    var foundObject = getObject(food, foodNameObject.html())

    editableText.val(cellHtml);

    $(this).replaceWith(editableText);
    editableText.focus();

    editableText.on('blur', function() {
      food.forEach(function(object) {
        if (object.name == foundObject.name && self.html() === foodNameObject.html()) {
          object.name = editableText.val();
        } else if (object.name == foundObject.name && self.html() === foodCaloriesObject.html()) {
          object.calories = editableText.val();
        }
      })
    var foodJSON = JSON.stringify(food)
    localStorage.setItem('food', foodJSON)
    editableText.replaceWith('<td>'+editableText.val()+'</td>')
    });
  })

  $("#create-exercise").on("click", function(){
    var exerciseName = $("input#exercise-name").val();
    var exerciseCalories = $("input#exercise-calories").val();
    var message = document.getElementById("exercise-message");
    if (exerciseName === '') { throw message.innerHTML = "Please enter a exercise name"; }
    if (foodCalories === '') { throw message.innerHTML = "Please enter a calorie amount"; }
    else {
      food.storeNewFood(exerciseName, exerciseCalories);
      table.addFoodRow();
      document.getElementById('exercise-name-name').value = '';
      document.getElementById('exercise-calories').value = '';
      document.getElementById('exercise-caloriesmessage').innerHTML = '';
  }})


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

  function storeNewExercise(exerciseName, exerciseCalories) {
    var exerciseJSON = localStorage.getItem('exercise')
    if (exerciseJSON == null) {
      exerciseJSON = '[]';
    }
    var currentExercise = JSON.parse(exerciseJSON);
    currentExercise.push( {name: exerciseName, calories: exerciseCalories} );
    exerciseJSON = JSON.stringify(currentExercise);
    localStorage.setItem('exercise', exerciseJSON);
  }

  $('form').submit(function(e){
    e.preventDefault();
  })

});


function getExercise() {
  exerciseStorage = localStorage.getItem('exercise')
  if (exerciseStorage == null) {
    exerciseStorage = '[]'
  }
}

function getObject(food, value) {
  var foundObject = {}
  food.forEach(function(object) {
    if (object.name == value) {
      foundObject = object
    }
  })
  return foundObject;
}
