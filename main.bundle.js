/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	Food = __webpack_require__(1);
	Table = __webpack_require__(2);
	Exercise = __webpack_require__(9);
	Breakfast = __webpack_require__(3);
	Lunch = __webpack_require__(5);
	Dinner = __webpack_require__(6);
	Snack = __webpack_require__(7);
	Totals = __webpack_require__(10);
	DailyMeals = __webpack_require__(4);

	$(document).ready(function () {
	  var table = new Table();
	  var food = new Food();
	  var exercise = new Exercise();
	  var breakfast = new Breakfast();
	  var lunch = new Lunch();
	  var dinner = new Dinner();
	  var snack = new Snack();
	  var myExercises = new MyExercises();
	  var totals = new Totals();
	  var dailyMeals = new DailyMeals();

	  var tables = document.getElementsByClassName('table-body');
	  var date = document.getElementById('today').innerHTML = formatTodayDate(new Date());
	  generateTables(date);

	  table.addCheckBoxes();

	  $('#yesterday').on('click', function () {
	    var myDate = new Date();
	    var thing = formatTodayDate(myDate);
	    myDate.setDate(myDate.getDate() - 1);
	    dailyMeals.addOrGetMeals(myDate);
	    generateTables(myDate);
	  });

	  $('#breakfast-button').on('click', function () {
	    breakfast.addBreakfast(date);
	    getCaloriesConsumed();
	    getCaloriesRemaining();
	  });

	  $('#lunch-button').on('click', function () {
	    lunch.addLunch(date);
	    getCaloriesConsumed();
	    getCaloriesRemaining();
	  });

	  $('#dinner-button').on('click', function () {
	    dinner.addDinner(date);
	    getCaloriesConsumed();
	    getCaloriesRemaining();
	  });

	  $('#snack-button').on('click', function () {
	    snack.addSnack(date);
	    getCaloriesConsumed();
	    getCaloriesRemaining();
	  });

	  $('#exercise-button').on('click', function () {
	    myExercises.addMyExercises(date);
	    getCaloriesBurned();
	    getCaloriesRemaining();
	  });

	  $('tbody').on('click', '.delete-icon', function (event) {
	    event.preventDefault();
	    var name = $(this).parent().parent().children().first().html();
	    var tableBody = $(this).parent().parent().parent()[0];
	    var localStorageData = table.getData(tableBody, date);
	    var meal = dailyMeals.addOrGetMeals(date);
	    localStorageData.forEach(function (object) {
	      if (object.name == name) {
	        localStorageData.splice(localStorageData.indexOf(object), 1);
	      }
	    });
	    meal.data[tableBody.id] = localStorageData;
	    var replacementMeals = dailyMeals.replaceMeal(meal, tableBody.id);
	    localStorageJSON = JSON.stringify(replacementMeals);
	    table.setData(tableBody, localStorageJSON);
	    getCaloriesConsumed();
	    getCaloriesBurned();
	    getCaloriesRemaining();
	    $(this).parent().parent().remove();
	  });

	  $("#create-food").on("click", function () {
	    var foodName = $("input#food-name").val();
	    var foodCalories = $("input#food-calories").val();
	    var message = document.getElementById("message");
	    if (foodName === '') {
	      throw message.innerHTML = "Please enter a food name";
	    }
	    if (foodCalories === '') {
	      throw message.innerHTML = "Please enter a calorie amount";
	    } else {
	      food.storeNewFood(foodName, foodCalories);
	      table.addFoodRow();
	      document.getElementById('food-name').value = '';
	      document.getElementById('food-calories').value = '';
	      document.getElementById('message').innerHTML = '';
	    }
	  });

	  $("#create-exercise").on("click", function () {
	    var exerciseName = $("input#exercise-name").val();
	    var exerciseCalories = $("input#exercise-calories").val();
	    var message = document.getElementById("exercise-message");
	    if (exerciseName === '') {
	      throw message.innerHTML = "Please enter an exercise name";
	    }
	    if (exerciseCalories === '') {
	      throw message.innerHTML = "Please enter a calorie amount";
	    } else {
	      exercise.storeNewExercise(exerciseName, exerciseCalories);
	      table.addExerciseRow();
	      document.getElementById('exercise-name').value = '';
	      document.getElementById('exercise-calories').value = '';
	      document.getElementById('exercise-message').innerHTML = '';
	    }
	  });

	  $('tbody').on('dblclick', 'td', function () {
	    var nameObject = $(this).parent().children().first();
	    var caloriesObject = $(this).parent().children().eq(1);
	    var tableBody = $(this).parent().parent()[0];
	    table.changeCell($(this), nameObject, caloriesObject, tableBody);
	  });

	  $('#food-filter').on('keyup', function () {
	    var rows = $("tbody").find("tr");
	    var filterValue = this.value.toLowerCase();
	    var filtered = [];

	    rows.hide();
	    if (filterValue.length) {
	      rows.each(function () {
	        if ($(this).children().first().html().toLowerCase().includes(filterValue)) {
	          $(this).show();
	        };
	      });
	    } else {
	      rows.show();
	    }
	  });

	  $('#exercise-filter').on('keyup', function () {
	    var food = $('input[id=exercise-filter]').val().toLowerCase();
	    $('tbody > tr').each(function () {
	      exerciseNameFilter(food, $(this));
	    });
	  });

	  function foodNameFilter(food, self) {
	    if (food == "") {
	      $('tbody').children().show();
	    } else if (self.children().first().html().toLowerCase() == food) {
	      self.show();
	    } else {
	      rows.show();
	    }
	  };

	  function exerciseNameFilter(food, self) {
	    if (food == "") {
	      $('tbody').children().show();
	    } else if (self.children().first().html().toLowerCase() == food) {
	      self.show();
	    } else {
	      self.hide();
	    }
	  }

	  $('form').submit(function (e) {
	    e.preventDefault();
	  });

	  function determineColor(element) {
	    if (parseInt(element.html()) > 0) {
	      return element.addClass('green-text');
	    } else if (parseInt(element.html()) < 0) {
	      return element.addClass('red-text');
	    }
	  }

	  getCaloriesConsumed();
	  getCaloriesBurned();
	  getCaloriesRemaining();

	  function getCaloriesConsumed() {
	    $('#calories-consumed').html(totals.caloriesConsumed());
	  }

	  function getCaloriesBurned() {
	    determineColor($('#calories-burned').html(totals.caloriesBurned()));
	  }

	  function getCaloriesRemaining() {
	    determineColor($('#calories-remaining').html(totals.caloriesRemaining()));
	  }

	  function generateTables(date) {
	    for (var i = 0; i < tables.length; i++) {
	      var tableBody = document.getElementsByClassName('table-body')[i];
	      table.createTable(tableBody, date);
	    }
	  }

	  function formatTodayDate(today) {
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();

	    if (dd < 10) {
	      dd = '0' + dd;
	    }

	    if (mm < 10) {
	      mm = '0' + mm;
	    }

	    today = mm + '/' + dd + '/' + yyyy;
	    return today;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	class Food {
	  constructor(name, calories) {
	    this.name = name;
	    this.calories = calories;
	  }

	  storeNewFood(foodName, foodCalories) {
	    var foodJSON = localStorage.getItem('food');
	    if (foodJSON == null) {
	      foodJSON = '[]';
	    }
	    var currentFood = JSON.parse(foodJSON);
	    currentFood.push({ name: foodName, calories: foodCalories });
	    foodJSON = JSON.stringify(currentFood);
	    localStorage.setItem('food', foodJSON);
	  }

	}

	module.exports = Food;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	Breakfast = __webpack_require__(3);
	Lunch = __webpack_require__(5);
	Dinner = __webpack_require__(6);
	Snack = __webpack_require__(7);
	MyExercises = __webpack_require__(8);

	var Table = function () {};

	Table.prototype.createTable = function (tableBody, date) {
	  var data = this.getData(tableBody, date);
	  for (var i = 0; i < data.length; i++) {
	    var tableRow = document.createElement('tr');
	    var dataItem = data[i];
	    var deleteCell = document.createElement('td');
	    var deleteIcon = "<a href ='#' class='delete-icon'><i class='small material-icons'>delete</i></a>";
	    tableBody.insertBefore(tableRow, tableBody.firstChild);
	    for (x in dataItem) {
	      var tableData = document.createElement('td');
	      tableRow.appendChild(tableData);
	      tableData.innerHTML = dataItem[x];
	    }
	    tableRow.appendChild(deleteCell);
	    deleteCell.innerHTML = deleteIcon;
	  }
	};

	Table.prototype.addCheckBoxes = function () {
	  var rows = $(".diary").find("tr");
	  rows.each(function () {
	    var name = $(this).children().first().html();
	    var checkBox = "<td> <form action='#'><p><input type='checkbox' id='" + name + "' class='checkbox'/> <label for='" + name + "'> </label></p></form></td>";
	    $(this).prepend(checkBox);
	  });
	};

	Table.prototype.addFoodRow = function () {
	  var tableBody = document.getElementsByClassName('table-body')[0];
	  var tableRow = document.createElement('tr');
	  var data = this.getData(tableBody);
	  var deleteCell = document.createElement('td');
	  var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
	  var dataItem = data[data.length - 1];

	  tableBody.insertBefore(tableRow, tableBody.firstChild);
	  for (x in dataItem) {
	    var tableData = document.createElement('td');
	    tableRow.appendChild(tableData);
	    tableData.innerHTML = dataItem[x];
	  }
	  tableRow.appendChild(deleteCell);
	  deleteCell.innerHTML = deleteIcon;
	};

	Table.prototype.addExerciseRow = function () {
	  var tableBody = document.getElementsByClassName('table-body')[0];
	  var tableRow = document.createElement('tr');
	  var data = this.getData(tableBody);
	  var deleteCell = document.createElement('td');
	  var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
	  var dataItem = data[data.length - 1];
	  tableBody.insertBefore(tableRow, tableBody.firstChild);
	  for (x in dataItem) {
	    var tableData = document.createElement('td');
	    tableRow.appendChild(tableData);
	    tableData.innerHTML = dataItem[x];
	  }
	  tableRow.appendChild(deleteCell);
	  deleteCell.innerHTML = deleteIcon;
	};

	Table.prototype.getData = function (tableBody, date) {
	  var breakfast = new Breakfast();
	  var lunch = new Lunch();
	  var dinner = new Dinner();
	  var snack = new Snack();
	  var myExercises = new MyExercises();

	  if (tableBody.id == "foods") {
	    return this.getFood();
	  } else if (tableBody.id == "exercises") {
	    return this.getExercise();
	  } else if (tableBody.id == "breakfast") {
	    return breakfast.getBreakfast(date);
	  } else if (tableBody.id == "lunch") {
	    return lunch.getLunch(date);
	  } else if (tableBody.id == "dinner") {
	    return dinner.getDinner(date);
	  } else if (tableBody.id == "snack") {
	    return snack.getSnack(date);
	  } else if (tableBody.id == "exercise") {
	    return myExercises.getMyExercises(date);
	  }
	};

	Table.prototype.getFood = function () {
	  var foodStorage = localStorage.getItem('food');
	  if (foodStorage == null) {
	    foodStorage = '[]';
	  }
	  return JSON.parse(foodStorage);
	};

	Table.prototype.getExercise = function () {
	  var exerciseStorage = localStorage.getItem('exercise');
	  if (exerciseStorage == null) {
	    exerciseStorage = '[]';
	  }
	  return JSON.parse(exerciseStorage);
	};

	Table.prototype.setData = function (tableBody, localStorageJSON) {
	  var breakfast = new Breakfast();
	  if (tableBody.id == "foods") {
	    localStorage.setItem('food', localStorageJSON);
	  } else if (tableBody.id == "exercises") {
	    localStorage.setItem('exercise', localStorageJSON);
	  } else {
	    localStorage.setItem('dailyMeals', localStorageJSON);
	  }
	};

	Table.prototype.changeCell = function (self, nameObject, caloriesObject, tableBody) {
	  var editableText = $("<textarea />");

	  editableText.val(self.html());
	  self.replaceWith(editableText);
	  editableText.focus();
	  this.loseFocus(self, editableText, nameObject, caloriesObject, tableBody);
	};

	Table.prototype.getObject = function (food, value) {
	  var foundObject = {};
	  food.forEach(function (object) {
	    if (object.name == value) {
	      foundObject = object;
	    }
	  });
	  return foundObject;
	};

	Table.prototype.loseFocus = function (self, editableText, nameObject, caloriesObject, tableBody) {
	  var data = this.getData(tableBody);
	  var foundObject = this.getObject(data, nameObject.html());
	  var table = this;
	  editableText.on('blur', function () {
	    data.forEach(function (object) {
	      if (object.name == foundObject.name && self.html() === nameObject.html()) {
	        object.name = editableText.val();
	      } else if (object.name == foundObject.name && self.html() === caloriesObject.html()) {
	        object.calories = editableText.val();
	      }
	    });

	    table.setData(tableBody, JSON.stringify(data));
	    editableText.replaceWith('<td>' + editableText.val() + '</td>');
	  });
	};

	module.exports = Table;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	DailyMeals = __webpack_require__(4);

	class Breakfast {
	  constructor() {
	    this.dailyMeals = new DailyMeals();
	  }

	  addBreakfast(date) {
	    var breakfastData = this.getBreakfast(date);
	    var boxes = document.getElementsByClassName('checkbox');
	    var meal = this.dailyMeals.addOrGetMeals(date);

	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        breakfastData.push({ name: name, calories: calories });
	        meal.data.breakfast = breakfastData;
	        var replaceMeals = this.dailyMeals.replaceMeal(meal, 'breakfast');
	        localStorage.setItem('dailyMeals', JSON.stringify(replaceMeals));
	        this.addBreakfastRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getBreakfast(date) {
	    var dailyMeals = this.dailyMeals.addOrGetMeals(date);
	    return dailyMeals.data.breakfast;
	  }

	  addBreakfastRow() {
	    var tableBody = document.getElementById('breakfast');
	    var tableRow = document.createElement('tr');
	    var date = document.getElementById('today').innerHTML;
	    var data = this.getBreakfast(date);
	    var deleteCell = document.createElement('td');
	    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
	    var dataItem = data[data.length - 1];

	    tableBody.insertBefore(tableRow, tableBody.firstChild);
	    for (x in dataItem) {
	      var tableData = document.createElement('td');
	      tableRow.appendChild(tableData);
	      tableData.innerHTML = dataItem[x];
	    }
	    tableRow.appendChild(deleteCell);
	    deleteCell.innerHTML = deleteIcon;
	  }
	}

	module.exports = Breakfast;

/***/ },
/* 4 */
/***/ function(module, exports) {

	class DailyMeals {
	  constructor() {}

	  getDailyMeals(date, dailyMealsStorage) {
	    if (dailyMealsStorage == null) {
	      dailyMealsStorage = '[]';
	    }
	    for (var i = 0; i < dailyMealsStorage.length; i++) {
	      if (dailyMealsStorage[i].date == date) {
	        var day = dailyMealsStorage[i];
	      } else {
	        day = undefined;
	      }
	    }
	    return day;
	  }

	  addOrGetMeals(date) {
	    var mealsJSON = this.generateMeals();
	    var meals = JSON.parse(mealsJSON);
	    var mealOnDate = this.getDailyMeals(date, meals);
	    var newDaily = { date: date, data: { breakfast: [], lunch: [], dinner: [], snack: [], exercise: [] } };
	    if (mealOnDate === undefined) {
	      meals.push(newDaily);
	      localStorage.setItem('dailyMeals', JSON.stringify(meals));
	      return newDaily;
	    } else {
	      return mealOnDate;
	    }
	  }

	  generateMeals() {
	    var localStorageJSON = localStorage.getItem('dailyMeals');
	    if (localStorageJSON == null) {
	      return localStorageJSON = '[]';
	    } else {
	      return localStorageJSON;
	    }
	  }

	  getAllMeals() {
	    var allMeals = JSON.parse(localStorage.dailyMeals);
	    return allMeals;
	  }

	  replaceMeal(replacementMeal, target) {
	    var allMeals = this.getAllMeals();
	    allMeals.forEach(function (meal) {
	      if (meal.date == replacementMeal.date) {
	        meal.data[target] = replacementMeal.data[target];
	      }
	    });
	    return allMeals;
	  }

	}

	module.exports = DailyMeals;

/***/ },
/* 5 */
/***/ function(module, exports) {

	class Lunch {
	  constructor() {
	    this.dailyMeals = new DailyMeals();
	  }

	  addLunch(date) {
	    var lunchData = this.getLunch(date);
	    var boxes = document.getElementsByClassName('checkbox');
	    var meal = this.dailyMeals.addOrGetMeals(date);

	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        lunchData.push({ name: name, calories: calories });
	        meal.data.lunch = lunchData;
	        var replaceMeals = this.dailyMeals.replaceMeal(meal, 'lunch');
	        localStorage.setItem('dailyMeals', JSON.stringify(replaceMeals));
	        this.addLunchRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getLunch(date) {
	    var dailyMeals = this.dailyMeals.addOrGetMeals(date);
	    return dailyMeals.data.lunch;
	  }

	  addLunchRow() {
	    var tableBody = document.getElementById('lunch');
	    var tableRow = document.createElement('tr');
	    var date = document.getElementById('today').innerHTML;
	    var data = this.getLunch(date);
	    var deleteCell = document.createElement('td');
	    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
	    var dataItem = data[data.length - 1];

	    tableBody.insertBefore(tableRow, tableBody.firstChild);
	    for (x in dataItem) {
	      var tableData = document.createElement('td');
	      tableRow.appendChild(tableData);
	      tableData.innerHTML = dataItem[x];
	    }
	    tableRow.appendChild(deleteCell);
	    deleteCell.innerHTML = deleteIcon;
	  }
	}

	module.exports = Lunch;

/***/ },
/* 6 */
/***/ function(module, exports) {

	class Dinner {
	  constructor() {
	    this.dailyMeals = new DailyMeals();
	  }

	  addDinner(date) {
	    var dinnerData = this.getDinner(date);
	    var boxes = document.getElementsByClassName('checkbox');
	    var meal = this.dailyMeals.addOrGetMeals(date);

	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        dinnerData.push({ name: name, calories: calories });
	        meal.data.dinner = dinnerData;
	        var replaceMeals = this.dailyMeals.replaceMeal(meal, 'dinner');
	        localStorage.setItem('dailyMeals', JSON.stringify(replaceMeals));
	        this.addDinnerRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getDinner(date) {
	    var dailyMeals = this.dailyMeals.addOrGetMeals(date);
	    return dailyMeals.data.dinner;
	  }

	  addDinnerRow() {
	    var tableBody = document.getElementById('dinner');
	    var tableRow = document.createElement('tr');
	    var date = document.getElementById('today').innerHTML;
	    var data = this.getDinner(date);
	    var deleteCell = document.createElement('td');
	    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
	    var dataItem = data[data.length - 1];

	    tableBody.insertBefore(tableRow, tableBody.firstChild);
	    for (x in dataItem) {
	      var tableData = document.createElement('td');
	      tableRow.appendChild(tableData);
	      tableData.innerHTML = dataItem[x];
	    }
	    tableRow.appendChild(deleteCell);
	    deleteCell.innerHTML = deleteIcon;
	  }
	}

	module.exports = Dinner;

/***/ },
/* 7 */
/***/ function(module, exports) {

	class Snack {
	  constructor() {
	    this.dailyMeals = new DailyMeals();
	  }

	  addSnack(date) {
	    var snackData = this.getSnack(date);
	    var boxes = document.getElementsByClassName('checkbox');
	    var meal = this.dailyMeals.addOrGetMeals(date);

	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        snackData.push({ name: name, calories: calories });
	        meal.data.snack = snackData;
	        var replaceMeals = this.dailyMeals.replaceMeal(meal, 'snack');
	        localStorage.setItem('dailyMeals', JSON.stringify(replaceMeals));
	        this.addSnackRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getSnack(date) {
	    var dailyMeals = this.dailyMeals.addOrGetMeals(date);
	    return dailyMeals.data.snack;
	  }

	  addSnackRow() {
	    var tableBody = document.getElementById('snack');
	    var tableRow = document.createElement('tr');
	    var date = document.getElementById('today').innerHTML;
	    var data = this.getSnack(date);
	    var deleteCell = document.createElement('td');
	    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
	    var dataItem = data[data.length - 1];

	    tableBody.insertBefore(tableRow, tableBody.firstChild);
	    for (x in dataItem) {
	      var tableData = document.createElement('td');
	      tableRow.appendChild(tableData);
	      tableData.innerHTML = dataItem[x];
	    }
	    tableRow.appendChild(deleteCell);
	    deleteCell.innerHTML = deleteIcon;
	  }
	}

	module.exports = Snack;

/***/ },
/* 8 */
/***/ function(module, exports) {

	class MyExercises {
	  constructor() {
	    this.dailyMeals = new DailyMeals();
	  }

	  getMyExercises(date) {
	    var dailyMeals = this.dailyMeals.addOrGetMeals(date);
	    return dailyMeals.data.exercise;
	  }

	  addMyExercises(date) {
	    var myExercises = this.getMyExercises(date);
	    var boxes = document.getElementsByClassName('checkbox');
	    var meal = this.dailyMeals.addOrGetMeals(date);

	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        myExercises.push({ name: name, calories: calories });
	        meal.data.exercise = myExercises;
	        var replaceMeals = this.dailyMeals.replaceMeal(meal, 'exercise');
	        localStorage.setItem('dailyMeals', JSON.stringify(replaceMeals));
	        this.addMyExercisesRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  addMyExercisesRow() {
	    var tableBody = document.getElementById('exercise');
	    var tableRow = document.createElement('tr');
	    var date = document.getElementById('today').innerHTML;
	    var data = this.getMyExercises(date);
	    var deleteCell = document.createElement('td');
	    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>';
	    var dataItem = data[data.length - 1];

	    tableBody.insertBefore(tableRow, tableBody.firstChild);
	    for (x in dataItem) {
	      var tableData = document.createElement('td');
	      tableRow.appendChild(tableData);
	      tableData.innerHTML = dataItem[x];
	    }
	    tableRow.appendChild(deleteCell);
	    deleteCell.innerHTML = deleteIcon;
	  }

	}
	module.exports = MyExercises;

/***/ },
/* 9 */
/***/ function(module, exports) {

	class Exercise {
	  constructor() {}

	  storeNewExercise(exerciseName, exerciseCalories) {
	    var exerciseJSON = localStorage.getItem('exercise');
	    if (exerciseJSON == null) {
	      exerciseJSON = '[]';
	    }
	    var currentExercise = JSON.parse(exerciseJSON);
	    currentExercise.push({ name: exerciseName, calories: exerciseCalories });
	    exerciseJSON = JSON.stringify(currentExercise);
	    localStorage.setItem('exercise', exerciseJSON);
	  }

	}

	module.exports = Exercise;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	DailyMeals = __webpack_require__(4);

	class Totals {
	  constructor() {}

	  caloriesConsumed() {
	    var data = [];
	    var caloriesList = [];
	    caloriesList = this.getCalories(this.createMealData(data));
	    return this.getCaloriesSum(caloriesList);
	  }

	  caloriesBurned() {
	    var rawData = JSON.parse(localStorage.dailyMeals);
	    var data = rawData[0].data.exercise;
	    var caloriesList = [];
	    caloriesList = this.getCalories(data); //this data object needs to be changed - data[0].data.my-exercises
	    return this.getCaloriesSum(caloriesList);
	  }

	  getCaloriesSum(caloriesList) {
	    if (caloriesList.length == 0) {
	      return 0;
	    } else {
	      return caloriesList.reduce(this.getSum);
	    }
	  }

	  caloriesRemaining() {
	    var goal = parseInt(document.getElementById('calories-goal').innerHTML);
	    return goal + this.caloriesBurned() - this.caloriesConsumed();
	  }

	  flattenArrays(data) {
	    var merged = [].concat.apply([], data);
	    return merged;
	  }

	  getSum(total, calorieAmount) {
	    return total + calorieAmount;
	  }

	  getCalories(data) {
	    var final = data.map(function (object) {
	      return parseInt(object.calories);
	    });
	    return final;
	  }

	  createMealData(data) {
	    var dailymeals = new DailyMeals();
	    var meals = ['breakfast', 'lunch', 'dinner', 'snack'];
	    var date = document.getElementById('today').innerHTML;
	    var dayMeals = dailymeals.addOrGetMeals(date);
	    for (var i = 0; i < meals.length; i++) {
	      var mealData = dayMeals.data[meals[i]];
	      data.push(mealData);
	    }
	    return this.flattenArrays(data);
	  }

	}
	module.exports = Totals;

/***/ }
/******/ ]);