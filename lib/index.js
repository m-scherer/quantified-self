Food = require('./food');
Table = require('./table');
Exercise = require('./exercise');
Breakfast = require('./breakfast');
Lunch = require('./lunch');
Dinner = require('./dinner');
Snack = require('./snack');
Totals = require('./totals');
DailyMeals = require('./daily-meals');

$(document).ready(function(){
  var table = new Table;
  var food = new Food;
  var exercise = new Exercise;
  var breakfast = new Breakfast;
  var lunch = new Lunch;
  var dinner = new Dinner;
  var snack = new Snack;
  var myExercises = new MyExercises;
  var totals = new Totals;
  var dailyMeals = new DailyMeals;

  var tables = document.getElementsByClassName('table-body');
  var date = document.getElementById('today').innerHTML = formatTodayDate( new Date() );
  generateTables(date);

  table.addCheckBoxes();

  $('#yesterday').on('click', function() {
    var myDate = new Date();
    var thing = formatTodayDate(myDate);
    myDate.setDate(myDate.getDate() - 1);
    dailyMeals.addOrGetMeals(myDate);
    generateTables(myDate);
  })

  $('#breakfast-button').on('click', function() {
    breakfast.addBreakfast(date);
    getCaloriesConsumed();
    getCaloriesRemaining();
  });

  $('#lunch-button').on('click', function() {
    lunch.addLunch();
    getCaloriesConsumed();
    getCaloriesRemaining();
  });

  $('#dinner-button').on('click', function() {
    dinner.addDinner();
    getCaloriesConsumed();
    getCaloriesRemaining();
  });

  $('#snack-button').on('click', function() {
    snack.addSnack();
    getCaloriesConsumed();
    getCaloriesRemaining();
  });

  $('#exercise-button').on('click', function() {
    myExercises.addMyExercises();
    getCaloriesBurned();
    getCaloriesRemaining();
  });

  $('tbody').on('click', '.delete-icon', function(event) {
    event.preventDefault();
    var name = $(this).parent().parent().children().first().html();
    var tableBody = $(this).parent().parent().parent()[0];
    var localStorageData = table.getData(tableBody, date);
    var meal = dailyMeals.addOrGetMeals(date);
    localStorageData.forEach(function(object) {
      if (object.name == name) {
        localStorageData.splice(localStorageData.indexOf(object), 1);
      }
    });
    meal.data.breakfast = localStorageData
    var replacementMeals = dailyMeals.replaceMeal(meal)
    localStorageJSON = JSON.stringify(replacementMeals);
    table.setData(tableBody, localStorageJSON);
    getCaloriesConsumed();
    getCaloriesBurned();
    getCaloriesRemaining();
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
    if (exerciseName === '') { throw message.innerHTML = "Please enter an exercise name"; }
    if (exerciseCalories === '') { throw message.innerHTML = "Please enter a calorie amount"; }
    else {
      exercise.storeNewExercise(exerciseName, exerciseCalories);
      table.addExerciseRow();
      document.getElementById('exercise-name').value = '';
      document.getElementById('exercise-calories').value = '';
      document.getElementById('exercise-message').innerHTML = '';
  }})

  $('tbody').on('dblclick', 'td', function(){
    var nameObject = $(this).parent().children().first();
    var caloriesObject = $(this).parent().children().eq(1);
    var tableBody = $(this).parent().parent()[0];
    table.changeCell($(this), nameObject, caloriesObject, tableBody)
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

  function determineColor(element) {
    if (parseInt(element.html()) > 0) {
      return element.addClass('green-text');
    } else if (parseInt(element.html()) < 0) {
      return element.addClass('red-text')
    }
  }

  getCaloriesConsumed();
  getCaloriesBurned();
  getCaloriesRemaining();

  function getCaloriesConsumed() {
    $('#calories-consumed').html(totals.caloriesConsumed());
  }

  function getCaloriesBurned() {
    determineColor( $('#calories-burned').html(totals.caloriesBurned()) );
  }

  function getCaloriesRemaining() {
    determineColor( $('#calories-remaining').html(totals.caloriesRemaining()) );
  }

  function generateTables(date) {
    for (var i = 0; i < tables.length; i++) {
      var tableBody = document.getElementsByClassName('table-body')[i];
      table.createTable(tableBody, date);
    }
  }

  function formatTodayDate(today){
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    }

    if(mm<10) {
      mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    return today;
  }

});
