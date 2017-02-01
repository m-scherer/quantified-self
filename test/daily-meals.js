var assert            = require('chai').assert;
var webdriver         = require('selenium-webdriver');
var test              = require('selenium-webdriver/testing');
var DailyMeals        = require('../lib/daily-meals');


test.describe('DailyMeals testing', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  });

  test.afterEach(function() {
    driver.quit();
  });

  test.it('can get breakfast', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');


    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'breakfast-button'}).click()

    driver.findElement({id: 'breakfast'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });
  });

  test.it('can delete breakfast', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'breakfast-button'}).click();
    driver.findElement({id: 'breakfast'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });

    driver.findElement({className: 'delete-icon'}).click();
    driver.findElement({id: 'breakfast'}).getText().then(function(textValue) {
      assert.include(textValue, "");
    });
  });

  test.it('can get lunch', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'lunch-button'}).click()

    driver.findElement({id: 'lunch'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });
  });

  test.it('can delete lunch', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'lunch-button'}).click();
    driver.findElement({id: 'lunch'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });

    driver.findElement({className: 'delete-icon'}).click();
    driver.findElement({id: 'lunch'}).getText().then(function(textValue) {
      assert.include(textValue, "");
    });
  });

  test.it('can get dinner', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'dinner-button'}).click()

    driver.findElement({id: 'dinner'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });
  });

  test.it('can delete dinner', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'dinner-button'}).click()

    driver.findElement({id: 'dinner'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });

    driver.findElement({className: 'delete-icon'}).click();
    driver.findElement({id: 'lunch'}).getText().then(function(textValue) {
      assert.include(textValue, "");
    });
  });


  test.it('can get snacks', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'snack-button'}).click()

    driver.findElement({id: 'snack'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });
  });

  test.it('can delete snacks', function() {
    driver.get('http://localhost:8080/foods.html');
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('Apple');
    calories.sendKeys('100')
    driver.findElement({id: 'create-food'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Apple]'}).click();
    driver.findElement({id: 'snack-button'}).click()

    driver.findElement({id: 'snack'}).getText().then(function(textValue) {
      assert.include(textValue, "Apple");
    });

    driver.findElement({className: 'delete-icon'}).click();
    driver.findElement({id: 'snack'}).getText().then(function(textValue) {
      assert.include(textValue, "");
    });
  });

  test.it('can get exercises', function() {
    driver.get('http://localhost:8080/exercises.html');
    var name = driver.findElement({id: 'exercise-name'});
    var calories = driver.findElement({id: 'exercise-calories'});
    name.sendKeys('Run');
    calories.sendKeys('100')
    driver.findElement({id: 'create-exercise'}).click();


    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Run]'}).click();
    driver.findElement({id: 'exercise-button'}).click();

    driver.findElement({id: 'exercise'}).getText().then(function(textValue) {
      assert.include(textValue, "Run");
    });

    driver.findElement({className: 'delete-icon'}).click();
    driver.findElement({id: 'exercise'}).getText().then(function(textValue) {
      assert.include(textValue, "");
    });

  });



});
