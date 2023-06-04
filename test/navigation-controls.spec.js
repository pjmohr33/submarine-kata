const { Submarine } = require('../src/submarine');
const { NavigationControls } = require('../src/navigation-controls');

describe('Navigation Controls', () => {
  // Setting values for beforeEach
  let controls;
  let plan;
  let res;
  let submarine;

  beforeEach(() => {
    // Plan to test
    plan = `
      forward 3
      down 10
      up 1`

    // Result of correct plan creation
    res = ['forward', 3, 'down', 10, 'up', 1];

    submarine = new Submarine;
    controls = submarine.controls;
  });

  afterEach(() => {
    // wipes each instance of controls to start fresh before running next test
    submarine = '';
    controls = '';
  });

  it('is a class of NavigationControls', () => {
    expect(submarine.controls instanceof NavigationControls).toEqual(true);
  });

  describe('Direction Operations', () => {

    it('Can interpet direction orders', () => {
      expect(controls.interpetPlan(plan)).toEqual(res);
    });

    it('Can execute direction orders', () => {
      controls.executeDirections.call(submarine, plan);

      expect(submarine.horizontalPosition).toEqual(3)

      expect(submarine.depth).toEqual(9);
    });
  });
});
