class Lunch {
  constructor(){}

  addLunch(){
    var lunchData = this.getLunch();
    var boxes = document.getElementsByClassName('checkbox');
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
        lunchData.push({name: name, calories: calories})
        var lunchJSON = JSON.stringify(lunchData);
        localStorage.setItem('lunch', lunchJSON);
        this.addLunchRow();
        boxes[i].checked = false;
      }
    }
  }

  getLunch(){
    var lunchStorage = localStorage.getItem('lunch');
    if (lunchStorage == null) {
      lunchStorage = '[]';
    }
    return JSON.parse(lunchStorage);
  }

  addLunchRow(){
    var tableBody = document.getElementById('lunch');
    var tableRow = document.createElement('tr');
    var data = this.getLunch();
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
