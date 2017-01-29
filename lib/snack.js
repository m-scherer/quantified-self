class Snack {
  constructor(){}

  addSnack(){
    var snackData = this.getSnack();
    var boxes = document.getElementsByClassName('checkbox');
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
        snackData.push({name: name, calories: calories})
        var snackJSON = JSON.stringify(snackData);
        localStorage.setItem('snack', snackJSON);
        this.addSnackRow();
        boxes[i].checked = false;
      }
    }
  }

  getSnack(){
    var snackStorage = localStorage.getItem('snack');
    if (snackStorage == null ) {
      snackStorage = '[]';
    }
    return JSON.parse(snackStorage);
  }

  addSnackRow(){
    var tableBody = document.getElementById('snack');
    var tableRow = document.createElement('tr');
    var data = this.getSnack();
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

module.exports = Snack;
