class Submarine {
  constructor() {
    this.depth = 0;
    this.horizontalPosition = 0;
  }

  up (num) {
    if(this.depth - num > 0){
      this.depth -= num;
    } else {
      this.depth -= this.depth;
    }

  }

  down (num) {
    this.depth += num;
  }
}

module.exports = { Submarine };
