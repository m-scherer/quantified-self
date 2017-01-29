class MyExercises {
  constructor () {}

  getMyExercises() {
    var myExercisesStorage = localStorage.getItem('myExercises');
    if (myExercisesStorage == null) {
      myExercisesStorage = '[]'
    }
    return JSON.parse(myExercisesStorage);
  }

  addMyExercises() {
    var myExercises = this.getMyExercises();
    var boxes = document.getElementsByClassName('checkbox');

    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;

        myExercises.push({name: name, calories: calories});
        localStorage.setItem('myExercises', JSON.stringify(myExercises));
        this.addMyExercisesRow()
        boxes[i].checked = false;
      }
    }
  }

  addMyExercisesRow() {
    var tableBody = document.getElementById('my-exercises');
    var tableRow = document.createElement('tr');
    var data = this.getMyExercises();
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
module.exports = MyExercises;
