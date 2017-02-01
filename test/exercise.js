var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
exerciseStorage = require('../lib/exercise')

test.describe('testing exercise', function() {
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

  test.it('should allow me to fill in new exercise fields', function() {

    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    exerciseName.sendKeys('this is a new exercise name');

    exerciseName.getAttribute('value').then(function(value) {
      assert.equal(value, 'this is a new exercise name');
    });

    exerciseCalories.sendKeys('this is a new calorie amount');

    exerciseCalories.getAttribute('value').then(function(value) {
      assert.equal(value, 'this is a new calorie amount');
    });
  });

  test.it('should allow me to create a new exercise', function() {

    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});

    exerciseName.sendKeys('new exercise');
    exerciseCalories.sendKeys('100');
    driver.findElement({id: 'create-exercise'}).click();

    driver.findElement({className: 'table-body'}).getText().then(function(textValue) {
      assert.include(textValue, "new exercise");
    });
  })

  test.it('should allow me to delete an exercise', function() {

    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});

    exerciseName.sendKeys('new exercise');
    exerciseCalories.sendKeys('100');
    driver.findElement({id: 'create-exercise'}).click();
    driver.findElement({id: 'exercises'}).getText().then(function(textValue) {
      assert.include(textValue, "new exercise");
    });
    driver.findElement({className: 'delete-icon'}).click();

    driver.executeScript("localStorage.getItem('exercise')").then(function(exercise) {
      assert.equal(exercise, null);
    });
  })

  test.it('requires a name for adding an exercise', function(){

    driver.get('http://localhost:8080/exercises.html');

    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});
    var message = driver.findElement({id: 'exercise-message'});

    exerciseCalories.sendKeys('100');
    submitButton.click();

    message.getText().then(function(messageText) {
      assert.equal(messageText, 'Please enter an exercise name');
    });
 })

  test.it('requires a calorie amount for adding a new exercise', function(){

    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var submitButton = driver.findElement({id: 'create-exercise'});
    var message = driver.findElement({id: 'exercise-message'});

    exerciseName.sendKeys('new exercise name');
    submitButton.click();

    message.getText().then(function(messageText) {
      assert.equal(messageText, 'Please enter a calorie amount');
    });
  })

  test.it('clears input fields and warning messages after exercise is created', function(){

    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});
    var warningMessage = driver.findElement({id: 'exercise-message'});

    exerciseCalories.sendKeys('500');
    submitButton.click();

    warningMessage.getText().then(function(value) {
      assert.equal(value, 'Please enter an exercise name');
    });

    exerciseName.sendKeys('running');
    submitButton.click();

    exerciseName.getText().then(function(fieldValue){
      assert.equal(fieldValue, '');
    });

    exerciseCalories.getText().then(function(fieldValue){
      assert.equal(fieldValue, '');
    });

    warningMessage.getText().then(function(messageValue) {
      assert.equal(messageValue, '');
    });
  })

  test.it('should persist exercises when browser refreshes', function(){

    driver.get('http://localhost:8080/exercises.html');

    var exercisesAdded = JSON.stringify([{name: 'running', calories: '500'}]);
    driver.executeScript("window.localStorage.setItem('exercise-calories', '" + exercisesAdded + "');");

    driver.get("http://localhost:8080/exercises.html");

    driver.executeScript("return window.localStorage.getItem('exercise-calories');").then(function(exerciseCalories){
      assert.equal(exerciseCalories, exercisesAdded);
    });
  });

  test.it('should filter exercises', function(){
    driver.get('http://localhost:8080/exercises.html');

    var filterBar = driver.findElement({css: '#exercise-filter'});

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Bike');
    exerciseCalories.sendKeys('300');
    submitButton.click();

    filterBar.sendKeys("bi");
    driver.sleep(100)

    driver.findElement({id: 'exercises'}).getText().then(function(value){
      assert.include(value, 'Bike');
      assert.notInclude(value, 'Run');
    });
  });

});
