class Breakfast {
  constructor(){}

  addBreakfast(){
    var breakfastData = this.getBreakfast();
    var boxes = document.getElementsByClassName('checkbox');
    for (var i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        var name = boxes[i].parentNode.parentNode.parentNode.parentNode.children[1].innerHTML;
        var calories = boxes[i].parentNode.parentNode.parentNode.parentNode.children[2].innerHTML;
        breakfastData.push({name: name, calories: calories})
        var breakfastJSON = JSON.stringify(breakfastData);
        localStorage.setItem('breakfast', breakfastJSON);
      }
    }
  }

  getBreakfast(){
    var breakfastStorage = localStorage.getItem('breakfast');
    if (breakfastStorage == null) {
      breakfastStorage = '[]';
    }
    return JSON.parse(breakfastStorage);
  }
}

module.exports = Breakfast;
