class DailyMeals {
  constructor(){}

  getDailyMeals() {
    var dailyMealsStorage = localStorage.getItem('dailyMeals');
    if (dailyMealsStorage == null) {
      dailyMealsStorage = '[]';
    }
    return JSON.parse(dailyMealsStorage);
  }

  addOrGetMeals(date) {
    var data = this.getDailyMeals();
    var newDaily = JSON.stringify({date: date, data:{} } );
    if (data === []) {
      return localStorage.setItem('dailyMeals', newDaily);
    } else {
      return data;
    }
  }

}


module.exports = DailyMeals;
