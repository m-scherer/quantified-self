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


  document.getElementById('today').innerHTML = formatTodayDate();

  var tables = document.getElementsByClassName('table-body');

  function date() {
    return document.getElementById('today').innerHTML;
  }

  generateTables(date());

  table.addCheckBoxes();

  $('#yesterday').on('click', function() {
    moveDate($(this));
  });

  $('#tomorrow').on('click', function() {
    moveDate($(this));
  });

  var clicked = 0
  $('#calories-header').on('click', function() {
    clicked += 1
      sortTable(clicked)
    });

    function sortTable(){
      var rows = $('#foods tr').get();
      var tableBody = document.getElementById('foods')

      rows.sort(function(a, b) {
        var A = parseInt($(a).children('td').eq(1).text());
        var B = parseInt($(b).children('td').eq(1).text());

        if(A < B) {
          return -1;
        }
        if(A > B) {
          return 1;
        }
        return 0;
      });
      if (clicked % 2 == 0) {
        $.each(rows, function(index, row) {
          $('#foods').append(row);
        });
      } else if (clicked % 3 == 0) {
        table.deleteTables();
        table.createTable(tableBody, date())
      } else {
        $.each(rows, function(index, row) {
          $('#foods').prepend(row, $('#foods').children().first());
        });
      }
  }

  $('#breakfast-button').on('click', function() {
    breakfast.addBreakfast(date());
    getCaloriesConsumed();
    getCaloriesRemaining();
    getBreakfastCaloriesConsumed();
    getBreakfastCaloriesRemaining();
  });

  $('#lunch-button').on('click', function() {
    lunch.addLunch(date());
    getCaloriesConsumed();
    getCaloriesRemaining();
    getLunchCaloriesConsumed();
    getLunchCaloriesRemaining();
  });

  $('#dinner-button').on('click', function() {
    dinner.addDinner(date());
    getCaloriesConsumed();
    getCaloriesRemaining();
    getDinnerCaloriesConsumed();
    getDinnerCaloriesRemaining();
  });

  $('#snack-button').on('click', function() {
    snack.addSnack(date());
    getCaloriesConsumed();
    getCaloriesRemaining();
    getSnackCaloriesConsumed();
    getSnackCaloriesRemaining();
  });

  $('#exercise-button').on('click', function() {
    myExercises.addMyExercises(date());
    getCaloriesBurned();
    getCaloriesRemaining();
    getCaloriesTableBurned();
  });

  $('tbody').on('click', '.delete-icon', function(event) {
    event.preventDefault();
    var name = $(this).parent().parent().children().first().html();
    var tableBody = $(this).parent().parent().parent()[0];
    var localStorageData = table.getData(tableBody, date());
    var meal = dailyMeals.addOrGetMeals(date());
    localStorageData.forEach(function(object) {
      if (object.name == name) {
        localStorageData.splice(localStorageData.indexOf(object), 1);
      }
    });
    meal.data[tableBody.id] = localStorageData
    var replacementMeals = dailyMeals.replaceMeal(meal, tableBody.id)
    localStorageJSON = JSON.stringify(replacementMeals);
    table.setData(tableBody, localStorageJSON);
    getCaloriesConsumed();
    getCaloriesBurned();
    getCaloriesRemaining();
    getBreakfastCaloriesRemaining();
    getLunchCaloriesRemaining();
    getDinnerCaloriesRemaining();
    getSnackCaloriesRemaining();
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
  };

  $('form').submit(function(e){
    e.preventDefault();
  })

  function determineColor(element) {
    if (parseInt(element.html()) >= 0) {
      element.removeClass('red-text');
      element.addClass('green-text');
    } else if (parseInt(element.html()) < 0) {
      element.removeClass('green-text')
      element.addClass('red-text')
    }
  }

  getCaloriesConsumed();
  getCaloriesBurned();
  getCaloriesRemaining();
  getBreakfastCaloriesConsumed();
  getBreakfastCaloriesRemaining();
  getLunchCaloriesConsumed();
  getLunchCaloriesRemaining();
  getDinnerCaloriesConsumed();
  getDinnerCaloriesRemaining();
  getSnackCaloriesConsumed();
  getSnackCaloriesRemaining();
  getCaloriesTableBurned();


  function getCaloriesConsumed() {
    $('#calories-consumed').html(totals.caloriesConsumed());
  }

  function getBreakfastCaloriesConsumed() {
    $('#breakfast-total-calories').html(breakfast.totalCaloriesConsumed());
  }

  function getBreakfastCaloriesRemaining() {
    determineColor( $('#breakfast-remaining-calories').html(breakfast.totalCaloriesRemaining()) );
  }

  function getLunchCaloriesConsumed() {
    $('#lunch-total-calories').html(lunch.totalCaloriesConsumed());
  }

  function getLunchCaloriesRemaining() {
    determineColor( $('#lunch-remaining-calories').html(lunch.totalCaloriesRemaining()) );
  }

  function getDinnerCaloriesConsumed() {
    $('#dinner-total-calories').html(dinner.totalCaloriesConsumed());
  }

  function getDinnerCaloriesRemaining() {
    determineColor( $('#dinner-remaining-calories').html(dinner.totalCaloriesRemaining()) );
  }

  function getSnackCaloriesConsumed() {
    $('#snack-total-calories').html(snack.totalCaloriesConsumed());
  }

  function getSnackCaloriesRemaining() {
    determineColor( $('#snack-remaining-calories').html(snack.totalCaloriesRemaining()) );
  }

  function getCaloriesBurned() {
    determineColor( $('#calories-burned').html(totals.caloriesBurned()) );
  }

  function getCaloriesTableBurned() {
    $('#exercise-total-calories').html(totals.caloriesBurned()).addClass('green-text');
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

  function formatTodayDate(date){
    date = date || new Date()
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();

    if(dd<10) {
      dd='0'+dd
    }

    if(mm<10) {
      mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    return today;
  }

  function moveDate(self) {
    var currentDate = document.getElementById('today').innerHTML
    var myDate = new Date(currentDate);
    var newDate = determineDate(self, myDate);
    var date = formatTodayDate(newDate);
    document.getElementById('today').innerHTML = date;
    var thing = dailyMeals.addOrGetMeals(date);
    table.deleteTables();
    generateTables(date);
    table.addCheckBoxes();
  }

  function determineDate(self, myDate) {
    if (self.attr('id') == 'yesterday') {
      return new Date(myDate.setDate(myDate.getDate() - 1));
    } else if (self.attr('id') == 'tomorrow') {
      return new Date(myDate.setDate(myDate.getDate() + 1));
    }
  }


});
