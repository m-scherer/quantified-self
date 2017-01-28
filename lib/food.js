class Food {
  constructor(name, calories) {
    this.name = name;
    this.calories = calories;
  }

  storeNewFood(foodName,foodCalories) {
    var foodJSON = localStorage.getItem('food')
    if (foodJSON == null) {
      foodJSON = '[]';
    }
    var currentFood = JSON.parse(foodJSON);
    currentFood.push( {name: foodName, calories: foodCalories} );
    foodJSON = JSON.stringify(currentFood);
    localStorage.setItem('food', foodJSON);
  }

}

module.exports = Food;
