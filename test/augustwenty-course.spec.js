const { Submarine } = require('../src/submarine');
const { augustwentyCourse } = require('../src/augustwenty-course');

describe("Our Submarine's run of the Augustwenty Course", () => {

  const theTest = augustwentyCourse;
  const submarine = new Submarine;

  // Submarine runs Augustwenty's Course
  submarine.controls.executeDirections.call(submarine, theTest);

  it('has the correct depth', () => {
    expect(submarine.depth).toEqual(1032);
  });

  it('has the correct horizontal position', () => {
    expect(submarine.horizontalPosition).toEqual(2052);
  });

  it('has the correct position product', () => {
    expect(submarine.getPositionProduct()).toEqual(2117664);
  });
});
