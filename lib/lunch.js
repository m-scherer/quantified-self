class Lunch {
  constructor(){
    this.dailyMeals = new DailyMeals;
  }

  addLunch(date){
    var lunchData = this.getLunch(date);
    var boxes = document.getElementsByClassName('checkbox');
    var meal = this.dailyMeals.addOrGetMeals(date)

    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
        lunchData.push({name: name, calories: calories});
        meal.data.lunch = lunchData;
        var replaceMeals = this.dailyMeals.replaceMeal(meal, 'lunch');
        localStorage.setItem('dailyMeals', JSON.stringify(replaceMeals));
        this.addLunchRow();
        boxes[i].checked = false;
      }
    }
  }

  getLunch(date){
    var dailyMeals = this.dailyMeals.addOrGetMeals(date);
    return dailyMeals.data.lunch;
  }

  addLunchRow(){
    var tableBody = document.getElementById('lunch');
    var tableRow = document.createElement('tr');
    var date = document.getElementById('today').innerHTML;
    var data = this.getLunch(date);
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

module.exports = Lunch;
