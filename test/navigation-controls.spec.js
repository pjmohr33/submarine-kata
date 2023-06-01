const { NavigationControls } = require('../src/navigation-controls');

describe('Navigation Controls', () => {

  let controls;

  beforeEach(() => {
    controls = new NavigationControls;
  });

  afterEach(() => {
    // wipes each instance of controls to start fresh before running next test
    controls = '';
  });

  it('is a class of NavigationControls', () => {
    expect(controls instanceof NavigationControls).toEqual(true);
  });
});
