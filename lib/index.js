storeNewFood = require('../lib/food')
storeNewExercise = require('../lib/exercise')

$(document).ready(function(){

  createTable();

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
      storeNewFood.storeNewFood(foodName, foodCalories);
      addFoodRow();
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
      storeNewExercise.storeNewExercise(exerciseName, exerciseCalories);
      addExerciseRow();
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

  $('form').submit(function(e){
    e.preventDefault();
  })


});

function createTable() {
  if (window.location.pathname == "/foods.html") {
     var tableBody = document.getElementById('table-body');
  } else {
    var tableBody = document.getElementById('exercise-table-body');
  }
  var data = getData();
  for (var i = 0; i < data.length; i++) {
    var tableRow = document.createElement('tr');
    var dataItem = data[i];
    var deleteCell = document.createElement('td')
    var deleteIcon = "<a href ='#' class='delete-icon'><i class='small material-icons'>delete</i></a>"
    tableBody.insertBefore(tableRow, tableBody.firstChild);

    for (x in dataItem) {
      var tableData = document.createElement('td');
      tableRow.appendChild(tableData);
      tableData.innerHTML = dataItem[x];
    }
    tableRow.appendChild(deleteCell)
    deleteCell.innerHTML = deleteIcon;
  }
}

function addFoodRow() {
  var tableBody = document.getElementById('table-body');
  var tableRow = document.createElement('tr');
  var data = getData();
  var deleteCell = document.createElement('td');
  var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>'
  var dataItem = data[data.length-1]

  tableBody.insertBefore(tableRow, tableBody.firstChild);
  for (x in dataItem){
    var tableData = document.createElement('td');
    tableRow.appendChild(tableData);
    tableData.innerHTML = dataItem[x];
  }
  tableRow.appendChild(deleteCell);
  deleteCell.innerHTML = deleteIcon;
}

function addExerciseRow() {
  var tableBody = document.getElementById('exercise-table-body');
  var tableRow = document.createElement('tr');
  var data = getData();
  var deleteCell = document.createElement('td');
  var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>'
  var dataItem = data[data.length-1]
  tableBody.insertBefore(tableRow, tableBody.firstChild);
  for (x in dataItem){
    var tableData = document.createElement('td');
    tableRow.appendChild(tableData);
    tableData.innerHTML = dataItem[x];
  }
  tableRow.appendChild(deleteCell);
  deleteCell.innerHTML = deleteIcon;
}

function getData() {
  var path = window.location.pathname
  var exerciseJSON = localStorage.getItem('exercise')
  var foodJSON = localStorage.getItem('food')

  if (path == "/exercises.html") {
    return getExercise();
  } else if (path == "/foods.html") {
    return getFood();
  }
}

function getFood() {
  foodStorage = localStorage.getItem('food')
  if (foodStorage == null) {
    foodStorage = '[]'
  }
  return JSON.parse(foodStorage);
}

function getExercise() {
  exerciseStorage = localStorage.getItem('exercise')
  if (exerciseStorage == null) {
    exerciseStorage = '[]'
  }
  return JSON.parse(exerciseStorage);
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
