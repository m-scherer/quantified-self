storeNewFood = require('../lib/food')

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

  $('tbody').on('dblclick', 'td', function(){
    var self = $(this)
    var cellHtml = $(this).html();
    var editableText = $("<textarea />");
    var food = JSON.parse(localStorage.food);
    var foundObject = getObject(food, cellHtml)

    editableText.val(cellHtml);
    $(this).replaceWith(editableText);
    editableText.focus();

    editableText.on('blur', function() {
      food.forEach(function(object) {
        if (object.name == foundObject.name) {
          object.name = editableText.val();
        }
      })
    var foodJSON = JSON.stringify(food)
    localStorage.setItem('food', foodJSON)
    editableText.replaceWith('<td>'+editableText.val()+'</td>')

  });
    // editableText.on('blur', editableTextBlurred(foundObject, $(this), editableText, food) );
  })

  // function editableTextBlurred(foundObject, self, textBox, food) {
  //
  //   food.forEach(function(object) {
  //     if (object.name == foundObject.name) {
  //       object.name = textBox.val();
  //     }
  //   })
  //   var foodJSON = JSON.stringify(food)
  //   localStorage.setItem('food', foodJSON)
  //
  //   self.html(textBox.val());
    // var cellSibling = $(this).prev().html();
    // if (cellSibling ==  null) {
    //   cellSibling = $(this).next().html();
    // }
    // var viewableText = $("<div>");
    // viewableText.html(html);
    // $(this).replaceWith(viewableText);
    // storeNewFood(viewableText.html(), cellSibling);
  // };


  $("#create-exercise").on("click", function(){
    var exerciseName = $("input#exercise-name").val();
    var exerciseCalories = $("input#exercise-calories").val();
    var message = document.getElementById("exercise-message");
    if (exerciseName === '') { throw message.innerHTML = "Please enter a exercise name"; }
    if (foodCalories === '') { throw message.innerHTML = "Please enter a calorie amount"; }
    else {
      storeNewFood(exerciseName, exerciseCalories);
      addFoodRow();
      document.getElementById('exercise-name-name').value = '';
      document.getElementById('exercise-calories').value = '';
      document.getElementById('exercise-caloriesmessage').innerHTML = '';
  }})


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

function createTable() {
  var tableBody = document.getElementById('table-body');
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

function storeNewFood(foodName,foodCalories) {
  var foodJSON = localStorage.getItem('food')
  if (foodJSON == null) {
    foodJSON = '[]';
  }
  var currentFood = JSON.parse(foodJSON);
  currentFood.push( {name: foodName, calories: foodCalories} );
  foodJSON = JSON.stringify(currentFood);
  localStorage.setItem('food', foodJSON);
}

function getFood() {
  foodStorage = localStorage.getItem('food')
  if (foodStorage == null) {
    foodStorage = '[]'
  }
  return JSON.parse(foodStorage);
}

function getExercise() {
  exerciseStorage = localStorage.getItem('food')
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
