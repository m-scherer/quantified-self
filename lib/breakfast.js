DailyMeals = require('./daily-meals');

class Breakfast {
  constructor(){
    this.dailyMeals = new DailyMeals;
  }

  addBreakfast(date){
    var breakfastData = this.getBreakfast(date);
    var boxes = document.getElementsByClassName('checkbox');
    var meal = this.dailyMeals.addOrGetMeals(date)

    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
        breakfastData.push({name: name, calories: calories});
        meal.data.breakfast = breakfastData;
        var replaceMeals = this.dailyMeals.replaceMeal(meal, 'breakfast');
        localStorage.setItem('dailyMeals', JSON.stringify(replaceMeals));
        this.addBreakfastRow();
        boxes[i].checked = false;
      }
    }
  }

  getBreakfast(date){
    var dailyMeals = this.dailyMeals.addOrGetMeals(date);
    return dailyMeals.data.breakfast;
  }

  addBreakfastRow(){
    var tableBody = document.getElementById('breakfast');
    var tableRow = document.createElement('tr');
    var date = document.getElementById('today').innerHTML;
    var data = this.getBreakfast(date);
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

  totalCaloriesConsumed() {
    var dayData = JSON.parse(localStorage.dailyMeals)[0].data;
    var breakfastData = dayData["breakfast"];
    var total = 0;
    for (var i = 0; i < breakfastData.length; i++) {
      var calories = (breakfastData[i]["calories"]);
      var caloriesNum = parseInt(calories);
      total += caloriesNum;
    }
    return total;
  }

  totalCaloriesRemaining(){
    var goal = 400;
    debugger;
    return goal - this.totalCaloriesConsumed();
  }


}

module.exports = Breakfast;
