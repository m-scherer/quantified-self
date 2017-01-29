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
        this.addMyExercisesRow
        boxes[i].checked = false;
      }
    }
  }

  addMyExercisesRow() {
    
  }

}
module.exports = MyExercises;
