$(document).ready(function(){

  $('.delete-icon').on('click', function() {
    console.log("hello");
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

  createTable();

});

function createTable() {
  var tableBody = document.getElementById('table-body');
  var food = JSON.parse( localStorage.getItem('food') )
  for (var i = 0; i < food.length; i++) {
    var tableRow = document.createElement('tr');
    var foodItem = food[i];
    var deleteCell = document.createElement('td')
    var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>'
    tableBody.appendChild(tableRow);

    for (x in foodItem) {
      var tableData = document.createElement('td');
      tableRow.appendChild(tableData);
      tableData.innerHTML = foodItem[x];
    }
    tableRow.appendChild(deleteCell)
    deleteCell.innerHTML = deleteIcon
  }
}

function addFoodRow() {
  var tableBody = document.getElementById('table-body');
  var tableRow = document.createElement('tr');
  var food = JSON.parse( localStorage.getItem('food') );
  var deleteCell = document.createElement('td');
  var deleteIcon = '<a href ="#" class="delete-icon"><i class="small material-icons">delete</i></a>'
  var foodItem = food[food.length-1]

  tableBody.appendChild(tableRow);
  for (x in foodItem){
    var tableData = document.createElement('td');
    tableRow.appendChild(tableData);
    tableData.innerHTML = foodItem[x];
  }
  tableRow.appendChild(deleteCell)
  deleteCell.innerHTML = deleteIcon
}
