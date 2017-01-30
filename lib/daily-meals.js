class DailyMeals {
  constructor(){}

  getDailyMeals(date, dailyMealsStorage) {
    if (dailyMealsStorage == null) {
      dailyMealsStorage = '[]';
    }
    for (var i = 0; i < dailyMealsStorage.length; i++) {
      if (dailyMealsStorage[i].date == date) {
        var thing = dailyMealsStorage[i]
      } else {
        thing = undefined
      }
    }
    return thing;
  }

  addOrGetMeals(date) {
    var mealsJSON = localStorage.getItem('dailyMeals');
    var meals = JSON.parse(mealsJSON)
    var mealOnDate = this.getDailyMeals(date, meals);
    var newDaily = {date: date, data:{ breakfast: [], lunch: [], dinner: [], snack: [] } };
    if (mealOnDate === undefined) {
      meals.push(newDaily)
      return localStorage.setItem('dailyMeals', JSON.stringify(meals));
    } else {
      return mealOnDate;
    }
  }

}


module.exports = DailyMeals;
