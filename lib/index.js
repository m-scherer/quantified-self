$(document).ready(function(){

  createTable();

  $('.delete-icon').on('click', function() {
    var name = $(this).parent().parent().children().first().html()
    var food = JSON.parse(localStorage.getItem('food'))
    food.forEach(function(object) {
      if (object.name == name) {
        food.splice(food.indexOf(object), 1);
      }
      foodJSON = JSON.stringify(food);
      localStorage.setItem('food', foodJSON);
    })
    
  })

  $("#create-food").on("click", function(){
    var foodName = $("input#food-name").val();
    var foodCalories = $("input#food-calories").val();
    storeNewFood(foodName, foodCalories);
    addFoodRow();
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

  function storeNewFood(foodName, foodCalories) {
    var foodJSON = localStorage.getItem('food')

    if (foodJSON == null) {
      foodJSON = '[]';
    }
    var currentFood = JSON.parse(foodJSON);

    currentFood.push( {name: foodName, calories: foodCalories} );

    foodJSON = JSON.stringify(currentFood);
    localStorage.setItem('food', foodJSON);
  }

});

function createTable() {
  var tableBody = document.getElementById('table-body');
  var data = getData();

  for (var i = 0; i < data.length; i++) {
    var tableRow = document.createElement('tr');
    var dataItem = data[i];
    var deleteCell = document.createElement('td')
    var deleteIcon = "<a href ='#' class='delete-icon'><i class='small material-icons'>delete</i></a>"
    tableBody.appendChild(tableRow);

    for (x in dataItem) {
      var tableData = document.createElement('td');
      tableRow.appendChild(tableData);
      tableData.innerHTML = dataItem[x];
    }
    tableRow.appendChild(deleteCell)
    deleteCell.innerHTML = deleteIcon
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
  tableRow.appendChild(deleteCell)
  deleteCell.innerHTML = deleteIcon
}

function getData() {
  var path = window.location.pathname
  if (path == "/exercises.html") {
    return JSON.parse( localStorage.getItem('exercises') );
  } else if (path == "/foods.html") {
    return JSON.parse( localStorage.getItem('food') );
  }
}
