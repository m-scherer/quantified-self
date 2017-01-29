class DailyMeals {
  constructor(){}

  getDailyMeals() {
    var dailyMealsStorage = localStorage.getItem('dailyMeals');
    if (dailyMealsStorage == null) {
      dailyMealsStorage = '[]';
    }
    return JSON.parse(dailyMealsStorage);
  }

}


module.exports = DailyMeals;
