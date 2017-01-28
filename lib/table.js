Breakfast = require('./breakfast')

var Table = function() {}

Table.prototype.createTable =  function() {
  var tableBody = document.getElementsByClassName('table-body')[0];
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
  var tableBody = document.getElementsByClassName('table-body');
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
  if (tableBody.id == "foods"){
    return this.getFood();
  } else if (tableBody.id == "exercises") {
    return this.getExercise();
  } else if (tableBody.id == "breakfast") {
    return breakfast.getBreakfast();
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


module.exports = Table;
