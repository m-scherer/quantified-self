DailyMeals = require('./daily-meals');

class Breakfast {
  constructor(){
    this.dailyMeals = new DailyMeals;
  }

  addBreakfast(){
    var breakfastData = this.getBreakfast();
    var boxes = document.getElementsByClassName('checkbox');

    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
        breakfastData.push({name: name, calories: calories})
        localStorage.setItem('breakfast', JSON.stringify(breakfastData));
        this.addBreakfastRow();
        boxes[i].checked = false;
      }
    }
  }

  getBreakfast(){
    this.dailyMeals.getDailyMeals();
    var breakfastStorage = localStorage.getItem('breakfast');
    if (breakfastStorage == null) {
      breakfastStorage = '[]';
    }
    return JSON.parse(breakfastStorage);
  }

  addBreakfastRow(){
    var tableBody = document.getElementById('breakfast');
    var tableRow = document.createElement('tr');
    var data = this.getBreakfast();
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
}

module.exports = Breakfast;
