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
	Exercise = __webpack_require__(8);
	Breakfast = __webpack_require__(3);
	Lunch = __webpack_require__(4);
	Dinner = __webpack_require__(5);
	Snack = __webpack_require__(6);
	Totals = __webpack_require__(9);

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

	  var tables = document.getElementsByClassName('table-body');

	  for (var i = 0; i < tables.length; i++) {
	    var tableBody = document.getElementsByClassName('table-body')[i];
	    table.createTable(tableBody);
	  }

	  table.addCheckBoxes();
	  totals.caloriesConsumed();

	  $('#breakfast-button').on('click', function () {
	    breakfast.addBreakfast();
	  });

	  $('#lunch-button').on('click', function () {
	    lunch.addLunch();
	  });

	  $('#dinner-button').on('click', function () {
	    dinner.addDinner();
	  });

	  $('#snack-button').on('click', function () {
	    snack.addSnack();
	  });

	  $('#exercise-button').on('click', function () {
	    myExercises.addMyExercises();
	  });

	  $('tbody').on('click', '.delete-icon', function (event) {
	    event.preventDefault();
	    var name = $(this).parent().parent().children().first().html();
	    var tableBody = $(this).parent().parent().parent()[0];
	    var localStorageData = table.getData(tableBody);
	    localStorageData.forEach(function (object) {
	      if (object.name == name) {
	        localStorageData.splice(localStorageData.indexOf(object), 1);
	      }
	      localStorageJSON = JSON.stringify(localStorageData);
	      table.setData(tableBody, localStorageJSON);
	    });
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
	      throw message.innerHTML = "Please enter a exercise name";
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
	Lunch = __webpack_require__(4);
	Dinner = __webpack_require__(5);
	Snack = __webpack_require__(6);
	MyExercises = __webpack_require__(7);

	var Table = function () {};

	Table.prototype.createTable = function (tableBody) {
	  var data = this.getData(tableBody);
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

	Table.prototype.getData = function (tableBody) {
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
	    return breakfast.getBreakfast();
	  } else if (tableBody.id == "lunch") {
	    return lunch.getLunch();
	  } else if (tableBody.id == "dinner") {
	    return dinner.getDinner();
	  } else if (tableBody.id == "snack") {
	    return snack.getSnack();
	  } else if (tableBody.id == "myexercises") {
	    return myExercises.getMyExercises();
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
	  } else if (tableBody.id == "breakfast") {
	    localStorage.setItem('breakfast', localStorageJSON);
	  } else if (tableBody.id == "lunch") {
	    localStorage.setItem('lunch', localStorageJSON);
	  } else if (tableBody.id == "dinner") {
	    localStorage.setItem('dinner', localStorageJSON);
	  } else if (tableBody.id == "snack") {
	    localStorage.setItem('snack', localStorageJSON);
	  } else if (tableBody.id == 'my-exercises') {
	    localStorage.setItem('myExercises', localStorageJSON);
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
/***/ function(module, exports) {

	class Breakfast {
	  constructor() {}

	  addBreakfast() {
	    var breakfastData = this.getBreakfast();
	    var boxes = document.getElementsByClassName('checkbox');

	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        breakfastData.push({ name: name, calories: calories });
	        localStorage.setItem('breakfast', JSON.stringify(breakfastData));
	        this.addBreakfastRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getBreakfast() {
	    var breakfastStorage = localStorage.getItem('breakfast');
	    if (breakfastStorage == null) {
	      breakfastStorage = '[]';
	    }
	    return JSON.parse(breakfastStorage);
	  }

	  addBreakfastRow() {
	    var tableBody = document.getElementById('breakfast');
	    var tableRow = document.createElement('tr');
	    var data = this.getBreakfast();
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

	class Lunch {
	  constructor() {}

	  addLunch() {
	    var lunchData = this.getLunch();
	    var boxes = document.getElementsByClassName('checkbox');
	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        lunchData.push({ name: name, calories: calories });
	        var lunchJSON = JSON.stringify(lunchData);
	        localStorage.setItem('lunch', lunchJSON);
	        this.addLunchRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getLunch() {
	    var lunchStorage = localStorage.getItem('lunch');
	    if (lunchStorage == null) {
	      lunchStorage = '[]';
	    }
	    return JSON.parse(lunchStorage);
	  }

	  addLunchRow() {
	    var tableBody = document.getElementById('lunch');
	    var tableRow = document.createElement('tr');
	    var data = this.getLunch();
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
/* 5 */
/***/ function(module, exports) {

	class Dinner {
	  constructor() {}

	  addDinner() {
	    var dinnerData = this.getDinner();
	    var boxes = document.getElementsByClassName('checkbox');
	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        dinnerData.push({ name: name, calories: calories });
	        var dinnerJSON = JSON.stringify(dinnerData);
	        localStorage.setItem('dinner', dinnerJSON);
	        this.addDinnerRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getDinner() {
	    var dinnerStorage = localStorage.getItem('dinner');
	    if (dinnerStorage == null) {
	      dinnerStorage = '[]';
	    }
	    return JSON.parse(dinnerStorage);
	  }

	  addDinnerRow() {
	    var tableBody = document.getElementById('dinner');
	    var tableRow = document.createElement('tr');
	    var data = this.getDinner();
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
/* 6 */
/***/ function(module, exports) {

	class Snack {
	  constructor() {}

	  addSnack() {
	    var snackData = this.getSnack();
	    var boxes = document.getElementsByClassName('checkbox');
	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
	        snackData.push({ name: name, calories: calories });
	        var snackJSON = JSON.stringify(snackData);
	        localStorage.setItem('snack', snackJSON);
	        this.addSnackRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  getSnack() {
	    var snackStorage = localStorage.getItem('snack');
	    if (snackStorage == null) {
	      snackStorage = '[]';
	    }
	    return JSON.parse(snackStorage);
	  }

	  addSnackRow() {
	    var tableBody = document.getElementById('snack');
	    var tableRow = document.createElement('tr');
	    var data = this.getSnack();
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
/* 7 */
/***/ function(module, exports) {

	class MyExercises {
	  constructor() {}

	  getMyExercises() {
	    var myExercisesStorage = localStorage.getItem('myExercises');
	    if (myExercisesStorage == null) {
	      myExercisesStorage = '[]';
	    }
	    return JSON.parse(myExercisesStorage);
	  }

	  addMyExercises() {
	    var myExercises = this.getMyExercises();
	    var boxes = document.getElementsByClassName('checkbox');

	    for (var i = 0; i < boxes.length; i++) {
	      if (boxes[i].checked) {
	        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
	        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;

	        myExercises.push({ name: name, calories: calories });
	        localStorage.setItem('myExercises', JSON.stringify(myExercises));
	        this.addMyExercisesRow();
	        boxes[i].checked = false;
	      }
	    }
	  }

	  addMyExercisesRow() {
	    var tableBody = document.getElementById('my-exercises');
	    var tableRow = document.createElement('tr');
	    var data = this.getMyExercises();
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
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	class Totals {
	  constructor() {}

	  caloriesConsumed() {
	    var data = [];
	    data.push(JSON.parse(localStorage.breakfast));
	    data.push(JSON.parse(localStorage.lunch));
	    data.push(JSON.parse(localStorage.dinner));
	    data.push(JSON.parse(localStorage.snack));

	    data = this.flattenArrays(data);
	    var start = 0;
	    var total = data.reduce(this.getSum);
	  }

	  flattenArrays(data) {
	    var merged = [].concat.apply([], data);
	    return merged;
	  }

	  getSum(total, object) {
	    debugger;
	    return total + parseInt(object.calories);
	  }
	}
	module.exports = Totals;

/***/ }
/******/ ]);
