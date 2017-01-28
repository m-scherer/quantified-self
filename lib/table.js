var Table = function() {}

Table.prototype.createTable =  function() {
  if (window.location.pathname == "/foods.html") {
    var tableBody = document.getElementById('table-body');
  } else {
    var tableBody = document.getElementById('exercise-table-body');
  }
  var data = this.getData();

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

Table.prototype.addFoodRow = function() {
  var tableBody = document.getElementById('table-body');
  var tableRow = document.createElement('tr');
  var data = this.getData();
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
  var tableBody = document.getElementById('exercise-table-body');
  var tableRow = document.createElement('tr');
  var data = this.getData();
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

Table.prototype.getData = function() {
  var path = window.location.pathname
  if (path == "/exercises.html") {
    return this.getExercise();
  } else if (path == "/foods.html") {
    return this.getFood();
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
