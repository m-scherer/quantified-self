class Dinner {
  constructor(){}

  addDinner(){
    var dinnerData = this.getDinner();
    var boxes = document.getElementsByClassName('checkbox');
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
        dinnerData.push({name: name, calories: calories})
        var dinnerJSON = JSON.stringify(dinnerData);
        localStorage.setItem('dinner', dinnerJSON);
        this.addDinnerRow();
        boxes[i].checked = false;
      }
    }
  }

  getDinner(){
    var dinnerStorage = localStorage.getItem('dinner');
    if (dinnerStorage == null) {
      dinnerStorage = '[]';
    }
    return JSON.parse(dinnerStorage);
  }

  addDinnerRow(){
    var tableBody = document.getElementById('dinner');
    var tableRow = document.createElement('tr');
    var data = this.getDinner();
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

module.exports = Dinner;
