# Quantified-Self
Quantified-Self is a Javascript project, built to track daily calorie input and output.  The user should be able to manage foods on the ```foods.html``` page and exercises on ```exercises.html```.  Daily activity can be tracked on ```index.html```.
## Contributions
  * [Megan Talbot](https://github.com/meganft)
  * [Michael Scherer](https://github.com/mscherer11)

## Getting Started
  Step 1: clone the repository

```git clone https://github.com/mscherer11/quantified-self.git ```

  Step 2: navigate into the *quantified-self* repository

  Step 3: install dependencies

  ```npm install```

  Step 4: start server

  ```npm start```

  Step 5: check [http://localhost:8080/index](http://localhost:8080/index) in browser

## Testing
  Quantified-Self is tested via *Selenium* and *Mocha*. Tests can be run with:
  ```npm test```

## Production
  Quantified-Self *production* can be accessed via [https://mscherer11.github.io/quantified-self/](https://mscherer11.github.io/quantified-self/index)

### Deploying to Production
  Changes can be deployed by:
  * commit/add changes
  * run: ```npm run build```
  * push changes to github

## Strategies
* HTML tables are built using javascript function, targeting each ```id```
* Information is stored in ```localStorage```
  * Access meals via: ```localStorage.dailyMeals```
  * Access foods index via: ```localStorage.food```
  * Access exercises index via: ```localStorage.exercise```
* ```dailyMeals``` have
  * key: date, value: *actual date*
  * key: data, value: object of ```breakfast```, ```lunch```, ```dinner```, ```snack```, ```exercises``` arrays

  # License

  The MIT License (MIT)

  Copyright (c) 2013-2016 Petka Antonov

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
