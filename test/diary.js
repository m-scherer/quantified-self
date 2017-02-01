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

  test.xit('adds a selected food to table', function(){
//cant find selector
    driver.get('http://localhost:8080/foods.html');

    var foodName = driver.findElement({id: 'food-name'});
    var foodCalories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'create-food'});

    foodName.sendKeys('pizza');
    foodCalories.sendKeys('500');
    submitButton.click();

    driver.get('http://localhost:8080/diary.html');

    var foodsCheckBox = driver.findElement({css: '#foods #table-body tbody tr td:nth-of-type(1)'}).click();
    var addToLunchButton = driver.findElement({css: '#lunch-button'})

    addToLunchButton.click();
    driver.findElement({css: '#lunch tr:nth-child(1) td:nth-child(1)'}).getText().then(function(textValue){
      assert.equal(textValue, 'pizza')
    });
  });
})
