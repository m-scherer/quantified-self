class DailyMeals {
  constructor(){}

  getDailyMeals(date, dailyMealsStorage) {
    if (dailyMealsStorage == null) {
      dailyMealsStorage = '[]';
    }
    for (var i = 0; i < dailyMealsStorage.length; i++) {
      if (dailyMealsStorage[i].date == date) {
        var day = dailyMealsStorage[i]
      } else {
        day = undefined
      }
    }
    return day;
  }

  addOrGetMeals(date) {
    var mealsJSON = this.generateMeals();
    var meals = JSON.parse(mealsJSON);
    var mealOnDate = this.getDailyMeals(date, meals);
    var newDaily = {date: date, data:{ breakfast: [], lunch: [], dinner: [], snack: [] } };
    if (mealOnDate === undefined) {
      meals.push(newDaily)
      localStorage.setItem('dailyMeals', JSON.stringify(meals));
      return newDaily
    } else {
      return mealOnDate;
    }
  }

  generateMeals() {
    var localStorageJSON = localStorage.getItem('dailyMeals');
    if (localStorageJSON == null) {
      return localStorageJSON = '[]'
    } else {
      return localStorageJSON;
    }
  }

  getAllMeals() {
    var allMeals = JSON.parse(localStorage.dailyMeals);
    return allMeals;
  }

  replaceMeal(replacementMeal, target) {
    var allMeals = this.getAllMeals();
    allMeals.forEach(function(meal){
      if (meal.date == replacementMeal.date) {
        meal.data[target] = replacementMeal.data[target];
      }
    });
    return allMeals;
  }

}


module.exports = DailyMeals;
