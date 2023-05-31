const { Submarine } = require('../src/submarine');

describe("Submarine", function () {

  let submarine;

  beforeEach(() => {
    submarine = new Submarine;
  });

  afterEach(() => {
    // wipes each instance of submarine before trying again
    submarine = '';
  });

  it('is a class of Submarine', () => {
    expect(submarine instanceof Submarine).toEqual(true);
  });


  describe("Submarine's Depth", function () {

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

  describe("Submarine's horizontalPosition", () => {
    
  })
});
