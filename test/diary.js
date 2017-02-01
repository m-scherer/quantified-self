var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing diary', function() {
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

  test.it('adds a selected food to table', function(){
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=pizza]'}).click();
    driver.findElement({id: 'lunch-button'}).click()

    driver.findElement({id: 'lunch'}).getText().then(function(textValue) {
      assert.include(textValue, "pizza");
    });
  });

  test.it('has totals', function() {
    driver.get('http://localhost:8080/index.html');
    var calories = driver.findElement({id: 'calories-goal'}).getText().then(function(textValue) {
      assert.equal(textValue, 2000);
    });
  });

  test.it('adds calories consumed', function() {
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=pizza]'}).click();
    driver.findElement({id: 'lunch-button'}).click()

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, 500);
    });
  });

  test.it('adds calories burned', function() {
    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Run]'}).click();
    driver.findElement({id: 'exercise-button'}).click()

    driver.findElement({id: 'calories-burned'}).getText().then(function(textValue) {
      assert.equal(textValue, 500);
    });
  });

  test.it('positive calories burned are green', function() {
    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Run]'}).click();
    driver.findElement({id: 'exercise-button'}).click()

    driver.findElement({id: 'calories-burned'}).getAttribute('class').then(function(textValue) {
      assert.equal(textValue, 'data green-text');
    });
  });

  test.it('changes calories remaining', function() {
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=pizza]'}).click();
    driver.findElement({id: 'lunch-button'}).click()

    driver.findElement({id: 'calories-remaining'}).getText().then(function(textValue) {
      assert.equal(textValue, 1500);
    });
  });

  test.it('positive remaining calories are green', function() {
    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Run]'}).click();
    driver.findElement({id: 'exercise-button'}).click()

    driver.findElement({id: 'calories-remaining'}).getAttribute('class').then(function(textValue) {
      assert.equal(textValue, 'data green-text');
    });
  });

  test.it('remaining calories are green when 0', function() {
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('2000');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=pizza]'}).click();
    driver.findElement({id: 'lunch-button'}).click()

    driver.findElement({id: 'calories-remaining'}).getAttribute('class').then(function(textValue) {
      assert.equal(textValue, 'data green-text');
    });
  });

  test.it('negative remaining calories are red', function() {
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('2500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=pizza]'}).click();
    driver.findElement({id: 'lunch-button'}).click()

    driver.findElement({id: 'calories-remaining'}).getAttribute('class').then(function(textValue) {
      assert.equal(textValue, 'data red-text');
    });
  });

  test.it('can get yesterday', function() {
    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'today'}).getText().then(function(today) {
      driver.findElement({id: 'yesterday'}).click();
      driver.findElement({id: 'today'}).getText().then(function(yesterday) {
        assert.notEqual(yesterday, today);
      });
    });
  });

  test.it('can get tomorrow', function() {
    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'today'}).getText().then(function(today) {
      driver.findElement({id: 'tomorrow'}).click();
      driver.findElement({id: 'today'}).getText().then(function(tomorrow) {
        assert.notEqual(today, tomorrow);
      });
    });
  });

  test.it('can persist todays data', function() {
    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css: 'label[for=Run]'}).click();
    driver.findElement({id: 'exercise-button'}).click();

    driver.findElement({id: 'yesterday'}).click();
    driver.findElement({id: 'tomorrow'}).click();

      driver.findElement({id: 'exercise'}).getText().then(function(text) {
        assert.include(text, 'Run');
      });
    });

  test.it('can persist yesterdays data', function() {
    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');
    driver.findElement({id: 'yesterday'}).click();
    driver.findElement({css: 'label[for=Run]'}).click();
    driver.findElement({id: 'exercise-button'}).click();
    driver.findElement({id: 'tomorrow'}).click();
    driver.findElement({id: 'yesterday'}).click();

      driver.findElement({id: 'exercise'}).getText().then(function(text) {
        assert.include(text, 'Run');
      });
    });

  test.it('can delete exercises from the diary', function() {
    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css:'.delete-icon'}).click();

    driver.findElement({id: 'exercise'}).getText().then(function(text) {
      assert.notInclude(text, 'Run');
    });
  });

  test.it('can delete foods from the diary', function() {
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    driver.findElement({css:'.delete-icon'}).click();

    driver.findElement({id: 'foods'}).getText().then(function(text) {
      assert.notInclude(text, 'pizza');
    });
  });

  test.it('should filter diary exercises', function(){
    driver.get('http://localhost:8080/exercises.html');

    var exerciseName = driver.findElement({id: 'exercise-name'});
    var exerciseCalories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'create-exercise'});

    exerciseName.sendKeys('Run');
    exerciseCalories.sendKeys('500');
    submitButton.click();

    exerciseName.sendKeys('Bike');
    exerciseCalories.sendKeys('300');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    var filterBar = driver.findElement({css: '#exercise-filter'});

    filterBar.sendKeys("bi");
    driver.sleep(100)

    driver.findElement({id: 'exercises'}).getText().then(function(value){
      assert.include(value, 'Bike');
      assert.notInclude(value, 'Run');
    });
  });

  test.it('should filter diary food', function(){
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    foodName.sendKeys('apples');
    foodCalories.sendKeys('300');
    submitButton.click();

    driver.get('http://localhost:8080/index.html');

    var filterBar = driver.findElement({css: '#food-filter'});

    filterBar.sendKeys("pi");
    driver.sleep(100)

    driver.findElement({id: 'foods'}).getText().then(function(value){
      assert.include(value, 'pizza');
      assert.notInclude(value, 'apples');
    });
  });

});
