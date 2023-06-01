const { Submarine } = require('../src/submarine');

describe('Submarine', function () {

  let submarine;

  beforeEach(() => {
    submarine = new Submarine;
  });

  afterEach(() => {
    // wipes each instance of submarine to start fresh before running next test
    submarine = '';
  });

  it('is a class of Submarine', () => {
    expect(submarine instanceof Submarine).toEqual(true);
  });

  describe('And has...', () => {

    describe("Depth Operations", function () {

      let submarine;

      beforeEach(() => {
        submarine = new Submarine;
      });

      afterEach(() => {
        // wipes each instance of submarine before trying again
        submarine = '';
      });

      it('has a depth of 0 and a horizontalPosition of 0', () => {

        expect(submarine.depth).toEqual(0);

        expect(submarine.horizontalPosition).toEqual(0);
      });

      it('increases in depth when given down commands', () => {
        submarine.down(7);

        expect(submarine.depth).toEqual(7);
      });

      it('decreases in depth when given up commands', () => {
        submarine.down(14);

        submarine.up(7);

        expect(submarine.depth).toEqual(7);
      });

      it('passes when given several inputs', () => {
        submarine.down(100);

        expect(submarine.depth).toEqual(100);

        submarine.up(50);

        expect(submarine.depth).toEqual(50);

        submarine.up(17);

        expect(submarine.depth).toEqual(33);

        submarine.down(42);

        expect(submarine.depth).toEqual(75);
      });

      it('cannot have a negative depth (be above the surface of the water)', () => {
        submarine.up(100)

        expect(submarine.depth).toEqual(0);
      });

      it('does move as far up as it can', () => {
        submarine.down(40);

        submarine.up(50);

        expect(submarine.depth).toEqual(0);
      });
    });

    describe("Horizontal Position Operations", () => {

      it('moves forward 5 units', () => {
        submarine.forward(5);

        expect(submarine.horizontalPosition).toEqual(5);
      });

      it('tracks multiple forward movements', () => {
        submarine.forward(5);

        expect(submarine.horizontalPosition).toEqual(5);

        submarine.forward(7);

        expect(submarine.horizontalPosition).toEqual(12);

        submarine.forward(17);

        expect(submarine.horizontalPosition).toEqual(29);

      });
    });

    describe('Position Product Operations', () => {

      it("can caluclate the Submarine's Position Product", () => {
        submarine.forward(1);

        submarine.up(5);

        submarine.down(15);

        submarine.forward(22);

        expect(submarine.horizontalPosition).toEqual(23);

        expect(submarine.depth).toEqual(15);

        expect(submarine.getPositionProduct()).toEqual(345);
      });

      it("calculates the Submarine's Position Product after an extensive travel plan", () => {
        submarine.forward(73);

        submarine.up(42);

        submarine.down(89);

        submarine.forward(17);

        submarine.up(55);

        submarine.down(28);

        submarine.forward(94);

        submarine.up(61);

        submarine.down(10);

        submarine.forward(36);

        expect(submarine.horizontalPosition).toEqual(220);

        expect(submarine.depth).toEqual(11);

        expect(submarine.getPositionProduct()).toEqual(2420);
      });
    });
  });
});
