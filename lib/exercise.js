class Exercise {
  constructor() {}

  storeNewExercise(exerciseName, exerciseCalories) {
    var exerciseJSON = localStorage.getItem('exercise');
    if (exerciseJSON == null) {
      exerciseJSON = '[]';
    }
    var currentExercise = JSON.parse(exerciseJSON);
    currentExercise.push( {name: exerciseName, calories: exerciseCalories} );
    exerciseJSON = JSON.stringify(currentExercise);
    localStorage.setItem('exercise', exerciseJSON);
  }

}

module.exports = Exercise;
