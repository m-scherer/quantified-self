var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
foodStorage   = require('../lib/food')

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

  test.xit('should allow me to fill in new food fields', function() {

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

  test.xit('should allow me to create a new food', function() {

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});

    name.sendKeys('new');
    calories.sendKeys('1');
    driver.findElement({id: 'create-food'}).click();

    driver.findElement({className: 'table-body'}).getText().then(function(textValue) {
      assert.include(textValue, "new");
    });
  })

  test.xit('should allow me to delete a food', function() {

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

  test.xit('requires a name for adding a food', function(){

    driver.get('http://localhost:8080/foods.html');

    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});
    var message = driver.findElement({id: 'message'});

    calories.sendKeys('100');
    submitButton.click();

    message.getText().then(function(messageText) {
      assert.equal(messageText, 'Please enter a food name');
    });
 })

  test.xit('requires a calorie amount for adding a new food', function(){

    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var submitButton = driver.findElement({id: 'create-food'});
    var message = driver.findElement({id: 'message'});

    foodName.sendKeys('new food name');
    submitButton.click();

    message.getText().then(function(messageText) {
      assert.equal(messageText, 'Please enter a calorie amount');
    });
  })

  test.xit('clears input fields and warning messages after food is created', function(){

    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});
    var warningMessage = driver.findElement({id: 'message'});

    foodCalories.sendKeys('500');
    submitButton.click();

    warningMessage.getText().then(function(value) {
      assert.equal(value, 'Please enter a food name');
    });

    foodName.sendKeys('pizza');
    submitButton.click();

    foodName.getText().then(function(fieldValue){
      assert.equal(fieldValue, '');
    });

    foodCalories.getText().then(function(fieldValue){
      assert.equal(fieldValue, '');
    });

    warningMessage.getText().then(function(messageValue) {
      assert.equal(messageValue, '');
    });
  })

  test.xit('should persist foods when browser refreshes', function(){

    driver.get('http://localhost:8080/foods.html');

    var caloriesAdded = JSON.stringify([{name: 'pizza', calories: '500'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + caloriesAdded + "');");

    driver.get("http://localhost:8080/foods.html");

    driver.executeScript("return window.localStorage.getItem('food-calories');").then(function(foodCalories){
      assert.equal(foodCalories, caloriesAdded);
    });
  })

  test.xit('allows me to filter foods', function(){
//this test is still not passing
    driver.get('http://localhost:8080/foods.html');

    var filterBar = driver.findElement({css: '#food-filter'});

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('taco');
    foodCalories.sendKeys('300');
    submitButton.click();

    filterBar.sendKeys("pi");

    driver.findElement({css: '#foods tbody tr td:nth-of-type(1)'}).getText().then(function(value){
      assert.equal(value, 'pizza');
    });
  });

  test.xit('allows me to edit a food after pressing enter', function(){
    //this test is still not passing

    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    var newName = driver.findElement({css: '#food-table tbody tr td:nth-of-type(1)'});
    newName.click();
    newName.sendKeys('tacos');

    driver.findElement({css: '#food-table tbody tr td:nth-of-type(1)'}).getText().then(function(event){
      assert.equal(event, 'tacos');
    });
  });

});
