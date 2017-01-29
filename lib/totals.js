class Totals {
  constructor(){}

  caloriesConsumed() {
    var data = [];
    var caloriesList = []
    caloriesList = this.getCalories(this.createMealData(data));
    return caloriesList.reduce(this.getSum);
  }

  caloriesBurned() {
    var data = JSON.parse(localStorage.myExercises);
    var caloriesList = [];
    caloriesList = this.getCalories(data);
    return caloriesList.reduce(this.getSum);
  }

  caloriesRemaining() {
    var goal = parseInt(document.getElementById('calories-goal').innerHTML)
    return goal + this.caloriesBurned() - this.caloriesConsumed();
  }

  flattenArrays(data) {
    var merged = [].concat.apply([], data);
    return merged;
  }

  getSum(total, calorieAmount) {
    return total + calorieAmount;
  }

  getCalories(data) {
    var final = data.map(function(object){
      return parseInt(object.calories);
    });
    return final;
  }

  createMealData(data) {
    var meals = ['breakfast', 'lunch', 'dinner', 'snack']
    for (var i = 0; i < meals.length; i++) {
      data.push(JSON.parse(localStorage[meals[i]]));
    }
    return this.flattenArrays(data);
  }

}
module.exports = Totals;
