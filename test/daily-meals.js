var assert      = require('chai').assert;
var webdriver   = require('selenium-webdriver');
var test        = require('selenium-webdriver/testing');
var dailyMeals  = require('../lib/daily-meals');

describe('DailyMeals testing', function() {
  it('can get all meals', function() {
    data = [ {date: '01/30/2017', data: {breakfast: [], lunch: [], dinner: [], snack: [], exercise: []}} ]
    mealsJSON = JSON.stringify(data);
    meals = JSON.parse(mealsJSON);
    assert.isArray(meals)
     assert.deepEqual(meals, data)
  });
});
