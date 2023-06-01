const { NavigationControls } = require('./navigation-controls');

class Submarine {
  constructor() {
    this.depth = 0;
    this.horizontalPosition = 0;
    this.controls = new NavigationControls;
  }

  up(num) {
    if (this.depth - num > 0) {
      this.depth -= num;
    } else {
      this.depth -= this.depth;
    }
  }

  down(num) {
    this.depth += num;
  }

  forward(num) {
    this.horizontalPosition += num;
  }

  getPositionProduct() {
    return this.depth * this.horizontalPosition;
  }
}

module.exports = { Submarine };
