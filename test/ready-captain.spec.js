const { ReadyCaptain } = require('../ready-captain');
const { Submarine } = require('../src/submarine');
const { augustwentyCourse } = require('../src/augustwenty-course');
const { NavigationControls } = require('../src/navigation-controls');

describe('Ready Captain', () => {

  let captain;

  beforeAll(() => {
    captain = new ReadyCaptain();
  });

  beforeEach(() => {
    captain.rl = {
      question: jest.fn(),
      close: jest.fn()
    };
  });

  it('initializes and loads some preset values', () => {
    expect(captain.rl).toBeDefined();
    expect(captain.submarine).toBeUndefined();
    expect(captain.controls).toBeUndefined();
    expect(captain.help).toBeUndefined();
    expect(captain.notLaunched).toEqual(true);
    expect(captain.navigationPlans).toHaveLength(1);
    expect(captain.navigationPlans[0].course).toEqual(augustwentyCourse);
    expect(captain.navigationPlans[0].name).toEqual(`Augustwenty's Course`);
    expect(captain.navigationPlans[0].shortHand).toEqual(`ATC`);
  })

  describe('startTheVoyage', () => {

    it("should prompt for captain's name and the boat's name", () => {
      captain.startTheVoyage();

      expect(captain.rl.question).toHaveBeenNthCalledWith(1, "Tell me, what's your name?\n> ", expect.any(Function));
      captain.rl.question.mock.calls[0][1]('test-name');

      expect(captain.rl.question).toHaveBeenNthCalledWith(2, 'What do you wanna call your submarine, Captain test-name?\n> ', expect.any(Function));
      captain.rl.question.mock.calls[1][1]('test-boat');
    });

    it('should set the submarine, controls, help, and helpLines', () => {
      expect(captain.submarine).toBeInstanceOf(Submarine);
      expect(captain.submarine.name).toBe('test-boat');

      expect(captain.controls).toBeInstanceOf(NavigationControls);
      expect(captain.help).toHaveLength(10);
      expect(captain.helpLine).toBeDefined();
      expect(captain.listPlansLine).toBeDefined();
      expect(captain.statLine).toBeDefined();
      expect(captain.runLine).toBeDefined();
    });

    describe('processCommand', () => {

      function mockInput(input) {
        captain.rl.question.mockImplementationOnce((question, callback) => {
          callback(input);
        });
      }

      let runProcess;

      beforeEach(() => {
        captain.printHelp = jest.fn();
        captain.delay = jest.fn().mockResolvedValue();
        console.clear = jest.fn();
        console.log = jest.fn();
        process.exit = jest.fn();
        runProcess = captain.processCommand.bind(captain, 'test-name', 'test-boat');
      });

      it("should prompt for the captain's next move", () => {
        runProcess();

        expect(captain.rl.question).toHaveBeenNthCalledWith(1, "Where to, Captain test-name?\n> ", expect.any(Function));
      });

      it("should display ship controls when 'c' command is entered", async () => {
        mockInput('c');

        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Here's your controls for Submarine test-boat, Captain!`));
        expect(captain.printHelp).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith('\n');
      });

      it("should sign off and quit when 'q' command is entered", async () => {
        mockInput('q');

        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(`\nSea ya later, Captain test-name!\n`);
        expect(captain.rl.close).toHaveBeenCalled();
        expect(process.exit).toHaveBeenCalled();
      });

      it("should move the submarine and display appropriate messages for forward commands", async () => {
        captain.notLaunched = false;
        // Assign the mock function to captain.submarine.move
        captain.submarine.move = jest.fn();

        mockInput('forward 10');
        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`You moved test-boat forward 10 nautical meters!`));
        expect(captain.submarine.move).toHaveBeenCalledWith('forward', 10);
      });

      it("should move the submarine and display appropriate messages for down commands", async () => {
        captain.notLaunched = false;
        // Assign the mock function to captain.submarine.move
        captain.submarine.move = jest.fn();

        mockInput('down 10');
        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`You moved test-boat down 10 nautical meters!`));
        expect(captain.submarine.move).toHaveBeenCalledWith('down', 10);
      });

      it("should move the submarine and display appropriate messages up commands when at the surface", async () => {
        captain.notLaunched = false;
        // Assign the mock function to captain.submarine.move
        captain.submarine.move = jest.fn();

        mockInput('up 10');
        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("You're already at the surface!\n"));
        // Code prevents ship from actually moving but will still call the function
        expect(captain.submarine.move).toHaveBeenCalledWith('up', 10);
      });

      it("should move the submarine and display appropriate messages up commands when reaching the surface", async () => {
        captain.notLaunched = false;
        captain.submarine.depth = 10;
        // Assign the mock function to captain.submarine.move
        captain.submarine.move = jest.fn();

        mockInput('up 10');
        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("You've broken to the surface"));
        expect(captain.submarine.move).toHaveBeenCalledWith('up', 10);
      });

      it("should move the submarine and display appropriate messages up commands when reaching the surface", async () => {
        captain.notLaunched = false;
        captain.submarine.depth = 11;
        // Assign the mock function to captain.submarine.move
        captain.submarine.move = jest.fn();

        mockInput('up 10');
        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("You moved test-boat up 10 nautical meters!\n"));
        expect(captain.submarine.move).toHaveBeenCalledWith('up', 10);
      });

      it("should run the launch sequence when first leaving home", async () => {
        captain.notLaunched = true;
        captain.submarine.depth = 11;
        // Assign the mock function to captain.submarine.move
        captain.submarine.move = jest.fn();

        mockInput('down 10');
        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Sealing the hatches..."));
      });

      it("should handle 'np' command and print all plans", async () => {
        mockInput('np');

        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Your Navigation Plans:"));

      });

      it("should handle 'run' command with a valid navigation plan", async () => {
        captain.notLaunched = false;
        captain.controls.executeDirections = jest.fn();
        captain.navigationPlans = [
          { name: 'August20', shortHand: "ATC", course: 'forward 10' }
        ];
        mockInput('run atc');

        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining(`Now journeying through the silent depths...`));
        expect(captain.controls.executeDirections).toHaveBeenCalledWith(captain.navigationPlans[0].course);
      });

      it("should handle 'stats' command and print current stats", async () => {
        mockInput('stats');

        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("test-boat's Current Status:"));
      });

      it("should handle 'rt' command and return home", async () => {
        mockInput('rt');

        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Now heaing back home..."));
      });

      it('should handle invalid command and display ship controls', async () => {
        mockInput('Bad cmd');

        await runProcess();

        expect(console.clear).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Hmm... \"bad cmd\" is not a control...'));
      })
    });
  });
});
setTimeout(process.exit, 900);
