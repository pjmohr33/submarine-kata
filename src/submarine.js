const { NavigationControls } = require('./navigation-controls');

class Submarine {
  constructor(name) {

    this.name = name;

    // Submarine is at surface and marks starting location
    this.depth = 0;
    this.horizontalPosition = 0;

    // Submarine has navigation controls
    this.controls = new NavigationControls;
  };

  // Moves the submarine up "num"
  up(num) {

    // Moves up 'num' if it won't break to the surface
    if (this.depth - num > 0) {
      this.depth -= num;

    } else {

      // Moves to the surface since this is submarine, not a plane (aka it cannot fly)
      this.depth -= this.depth;
    };
  };

  // Moves the submarine down "num"
  down(num) {
    this.depth += num;
  };

  // Moves the submarine forward "num"
  forward(num) {
    this.horizontalPosition += num;
  };

  // Calculates product of depth and horizontal position
  getPositionProduct() {
    return this.depth * this.horizontalPosition;
  };

  // Lanches submarine based on command and given number
  move(cmd, num) {
    if (cmd === 'forward') {
      this.forward(num);
    } else if (cmd === 'down') {
      this.down(num);
    } else if (cmd === 'up') {
      this.up(num);
    };
  };
};

module.exports = { Submarine };
