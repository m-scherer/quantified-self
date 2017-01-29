class Totals {
  constructor(){}

  caloriesConsumed() {
    var data = []
    data.push(JSON.parse(localStorage.breakfast));
    data.push(JSON.parse(localStorage.lunch));
    data.push(JSON.parse(localStorage.dinner));
    data.push(JSON.parse(localStorage.snack));

    data = this.flattenArrays(data);
    var start = 0
    var total = data.reduce(this.getSum);
  }

  flattenArrays(data) {
    var merged = [].concat.apply([], data);
    return merged;
  }

  getSum(total, object) {
    debugger;
    return total + parseInt(object.calories)
  }
}
module.exports = Totals;
