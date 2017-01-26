var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
foodStorage = require('../lib/food')

test.describe('testing food', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it('should allow me to fill in new food fields', function() {

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('this is a new food name');

    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'this is a new food name');
    });

    calories.sendKeys('this is a new calorie amount');

    calories.getAttribute('value').then(function(value) {
      assert.equal(value, 'this is a new calorie amount');
    });
  });

  test.it('should allow me to create a new food', function() {

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});

    name.sendKeys('new');
    calories.sendKeys('1');
    driver.findElement({id: 'create-food'}).click();

    driver.findElement({id: 'table-body'}).getText().then(function(textValue) {
      assert.include(textValue, "new");
    });

  })

  test.it('should allow me to delete a food', function() {

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});

    name.sendKeys('new');
    calories.sendKeys('1');
    driver.findElement({id: 'create-food'}).click();
    driver.findElement({className: 'delete-icon'}).click();

    driver.executeScript("localStorage.getItem('food')").then(function(food) {
      assert.equal(food, null);
    });

  })

});
