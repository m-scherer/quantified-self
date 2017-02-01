var assert      = require('chai').assert;
var webdriver   = require('selenium-webdriver');
var test        = require('selenium-webdriver/testing');
var dailyMeals  = require('../lib/daily-meals');

describe('DailyMeals testing', function() {
  it('can get all meals', function() {
    mealsJSON = JSON.stringify([{date:01/30/2017,data:{breakfast:[{name:Apples,calories:40}],lunch:[{name:Peaches,calories:20}],dinner:[{name:Pasta,calories:400}],snack:[{name:Broccoli,calories:15}],exercise:[{name:Jumping,calories:500}]}}])
    debugger;
  });
});
