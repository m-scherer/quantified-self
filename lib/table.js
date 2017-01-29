Breakfast = require('./breakfast');
Lunch = require('./lunch');
Dinner = require('./dinner');
Snack = require('./snack');

var Table = function() {}

Table.prototype.createTable =  function(tableBody) {
  var data = this.getData(tableBody);
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

Table.prototype.addCheckBoxes = function() {
  var rows = $(".diary").find("tr");
  rows.each(function(){
    var name = $(this).children().first().html();
    var checkBox = "<td> <form action='#'><p><input type='checkbox' id='"+name+"' class='checkbox'/> <label for='"+name+"'> </label></p></form></td>";
    $(this).prepend(checkBox);
  });
}

Table.prototype.addFoodRow = function() {
  var tableBody = document.getElementsByClassName('table-body')[0];
  var tableRow = document.createElement('tr');
  var data = this.getData(tableBody);
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

Table.prototype.addExerciseRow = function() {
  var tableBody = document.getElementsByClassName('table-body')[0];
  var tableRow = document.createElement('tr');
  var data = this.getData(tableBody);
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

Table.prototype.getData = function(tableBody) {
  var breakfast = new Breakfast;
  var lunch = new Lunch;
  var dinner = new Dinner;
  var snack = new Snack;
  if (tableBody.id == "foods"){
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
  }
}

Table.prototype.getFood = function() {
  var foodStorage = localStorage.getItem('food');
  if (foodStorage == null) {
    foodStorage = '[]';
  }
  return JSON.parse(foodStorage);
}

Table.prototype.getExercise = function() {
  var exerciseStorage = localStorage.getItem('exercise')
  if (exerciseStorage == null) {
    exerciseStorage = '[]'
  }
  return JSON.parse(exerciseStorage)
}

Table.prototype.deleteData = function(tableBody, localStorageJSON) {
  var breakfast = new Breakfast;
  if (tableBody.id == "foods"){
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
  }
}

Table.prototype.changeCell = function(self, nameObject, caloriesObject, tableBody) {
  var editableText = $("<textarea />");

  editableText.val(self.html());
  self.replaceWith(editableText);
  editableText.focus();
  this.loseFocus(self, editableText, nameObject, caloriesObject, tableBody)
  }

Table.prototype.getObject = function(food, value) {
  var foundObject = {}
  food.forEach(function(object) {
    if (object.name == value) {
      foundObject = object
    }
  })
  return foundObject;
}

Table.prototype.loseFocus = function(self, editableText, nameObject, caloriesObject, tableBody) {
  var data = this.getData(tableBody);
  var foundObject = this.getObject(data, nameObject.html());
  var table = this;
  editableText.on('blur', function() {
    data.forEach(function(object) {
      if (object.name == foundObject.name && self.html() === nameObject.html()) {
        object.name = editableText.val();
      } else if (object.name == foundObject.name && self.html() === caloriesObject.html()) {
        object.calories = editableText.val();
      }
    });

    table.deleteData(tableBody, JSON.stringify(data));
    editableText.replaceWith('<td>'+editableText.val()+'</td>')
  });
}




module.exports = Table;
