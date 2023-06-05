const readline = require('readline');

const { Submarine } = require('./src/submarine');
const { augustwentyCourse } = require('./src/augustwenty-course');

class ReadyCaptain {
  constructor() {

    // Create User Input Interface
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Submarine starts beached
    this.notLaunched = true;

    // Include Augustwenty's Given Course to solve
    this.navigationPlans = [
      {
        name: `Augustwenty's Course`,
        course: augustwentyCourse,
        shortHand: 'ATC'
      }];
  };

  // Begins the readline interface
  startTheVoyage() {

    console.clear();
    console.log('Ahoy Captain! \n\nWelcome To Your New Life Below The Sea!\n');

    // Gather Captain's Name
    this.rl.question("Tell me, what's your name?\n> ", (name) => {

      // Modify to ensure correct format
      name = name.trim();

      console.clear();
      console.log(`Captain ${name} is purdy fine name...\n`);

      // Gather Submarine's Name
      this.rl.question(`What do you wanna call your submarine, Captain ${name}?\n> `, (boatName) => {

        // Modify to ensure correct format
        boatName = boatName.trim();

        // Inititate submarine, navigation controls, and help menu
        this.submarine = new Submarine(boatName);
        this.controls = this.submarine.controls;
        this.help = [
          "Controls:",
          `  Type 'c' to sea Submarine ${boatName}'s controls`,
          "  Type 'q' to quit",
          `  Type 'np' to sea ${this.navigationPlans.length} preset navigation plan(s)`,
          "  Type 'run <plan>' to run a navigation plan",
          `  Type 'forward <number> to move ${boatName} forward <number> nautical meters`,
          `  Type 'down <number> to move ${boatName} down <number> nautical meters`,
          `  Type 'up <number> to move ${boatName} up <number> nautical meters`,
          `  Type 'stats' to sea all ${boatName}'s current marine stats`,
          `  Type 'rt' return home to your naval base`
        ];

        // Create references for specific help lines
        this.helpLine = this.help[1];
        this.listPlansLine = this.help[3];
        this.runLine = this.help[4];
        this.statLine = this.help[8];

        // User Start Message
        console.clear();
        console.log(`Submarine ${boatName} sure is a great name!\n`);
        console.log(`Here's your controls for Submarine ${boatName}, Captain!\n`);
        this.printHelp();
        console.log("");
        console.log('Sooo...\n');

        // Begin User Experience
        this.processCommand(name, boatName);
      });
    });
  };

  // Iterates through our help menu array
  printHelp() {
    this.help.forEach(line => console.log(line));
  };

  // Custom delay function to stimulate ship takeoff
  async delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  // Recursive function to handle User's inputs
  processCommand(name, boatName) {

    // Prompts for User's Command
    this.rl.question(`Where to, Captain ${name}?\n> `, async cmd => {
      cmd = cmd.trim().toLowerCase();

      // Command for Ship's controls
      if (cmd === 'c') {

        console.clear();
        console.log(`Here's your controls for Submarine ${boatName}, Captain!\n`);

        // Iterates through our help menu
        this.printHelp();
        console.log('\n');

        // Command to quit the program
      } else if (cmd === 'q') {

        // Says goodbye to Captain
        console.clear();
        console.log(`\nSea ya later, Captain ${name}!\n`);

        // Signs off and quits
        this.rl.close();
        process.exit();

        // Comman to move the ship
      } else if (['forward', 'up', 'down'].indexOf(cmd.split(" ")[0]) >= 0) {
        console.clear();

        // Finds command and number and checks for extra values
        let num = parseFloat(cmd.split(' ')[1]);
        let extras = cmd.split(' ').slice(2).join(' ');
        let command = cmd.split(' ')[0];

        // Clean up command and notify user of extra values
        if (extras) {
          console.log(`Assuming you wanted '${command} ${num}', ignoring '${extras}'\n`);
        };

        // Starts Launch sequence if boat is not lanuched and num is a number > 0
        if (this.notLaunched && !(command === 'up' && this.submarine.depth - num <= 0) && num) {

          // Launch Sequence
          console.log('Sealing the hatches...');
          await this.delay(3000);
          console.log('Checking oxygen levels and pressure gauges...');
          await this.delay(3000);
          console.log('Prepping the engines...');
          await this.delay(2000);
          console.log('Engaging underwater turbines...');
          await this.delay(2000);
          console.log('Calibrating sonar systems...');
          await this.delay(1000);
          console.log('Initializing navigation systems...');
          await this.delay(1000);
          console.log('Performing final system checks...\n');
          await this.delay(2500);
          console.log(`\nAnd You've Launched Captain ${name}!\n`);
          await this.delay(2000);

          // Marks that boat launched
          this.notLaunched = false;
        };

        // Handles 'Up' commands when breaking and already at the surface
        if (command === 'up' && num !== 0) {

          // Already at the surface
          if (this.submarine.depth === 0) {
            console.log("You're already at the surface!\n\nWe're a submarine, not a plane!\n");

            // Breaking the Surface
          } else if (this.submarine.depth - num <= 0) {
            if (this.submarine.depth - num < 0) {
              num = this.submarine.depth;
              console.log(`Can't move further than ${num}!`);
            }
            console.log(`Moving ${boatName} ${command} ${num} nautical meters!\n`);
            console.log(`You've broken to the surface, Captain ${name}!\n`);

            // Valid Up move Moves the Boat!
          } else {
            console.log(`You moved ${boatName} ${command} ${num} nautical meters!\n`);
          };

          // If didn't send a valid number to move
        } else if (isNaN(num)) {
          console.log(`I was wondering where the rum went! \n\nWhat kinda direction is '${cmd}'!? You drunk Captain?\n`);

          // If that number was 0
        } else if (num === 0) {
          console.log(`We can't move '${cmd}', Captain! That doesn't move the ship!\n`);

          // All other moves
        } else {
          console.log(`You moved ${boatName} ${command} ${num} nautical meters!\n`);
        };

        // Print command for stats and controls
        console.log(this.statLine);
        console.log(this.helpLine + '\n');

        // Moves boat if not 0 or NaN
        if (num) {
          this.submarine.move(command, num);
        };

        // Lanches a prebuilt navigation course
      } else if (cmd.trim().startsWith("run")) {


        // Format and pull the plan from the given user command
        let plan = cmd.trim().split(' ').slice(1).join(' ');
        // Marks false if for loop can't find it
        let planExists = false;

        // Iterate through all plans to find matching plan
        for (let i = 0; i < this.navigationPlans.length; i++) {
          // Let exact name or shorthand command find the plan
          if (this.navigationPlans[i].name.toLowerCase() === plan || this.navigationPlans[i].shortHand.toLowerCase() === plan) {
            // Lanch the plan
            this.controls.executeDirections.call(this.submarine, this.navigationPlans[i].course);
            // Set to found
            planExists = true;
            // Exit for loop
            break;
          };
        };

        console.clear();

        // If plan found and boat not launched start the lanch sequence
        if (planExists) {
          if (this.notLaunched) {
            console.log('Sealing the hatches...');
            await this.delay(3000);
            console.log('Checking oxygen levels and pressure gauges...');
            await this.delay(3000);
            console.log('Prepping the engines...');
            await this.delay(2000);
            console.log('Engaging underwater turbines...');
            await this.delay(2000);
            console.log('Calibrating sonar systems...');
            await this.delay(1000);
            console.log('Initializing navigation systems...');
            await this.delay(1000);
            console.log('Performing final system checks...');
            await this.delay(2500);
            console.log(`\n\nAnd You've Launched Captain ${name}!\n`);
            await this.delay(2000);

            // Set to launched
            this.notLaunched = false;
          };

          // Standard travel Message sequence
          console.log(`Now journeying through the silent depths...`);
          await this.delay(5000);
          console.log(`\nHalfway there...`);
          await this.delay(3000);
          console.log(`Almost...`);
          await this.delay(2000);
          console.log(`\n\nAnd You've Arrived!`);
          console.log('\nWoah, that was a mighty trip!\n');
          console.log(this.statLine);

          // If plan not found, alert, and print existing plans
        } else {
          console.log(`Hmm... "${plan}" is not a navigation plan, Captain ${name}\n`);
          console.log('Your Navigation Plans:');

          // 'i' numbers plans, forEach interates through them, prints, and then adds 1 to 'i'
          let i = 1;
          this.navigationPlans.forEach(plan => {
            console.log(`  ${i}: Name: ${plan.name}`);
            console.log(`     To Run Use: 'run ${plan.shortHand}'`);
            console.log('');
            i++;
          });

          // Remind user how to launch plans
          console.log(this.runLine);
        };
        // Remind how to Print ship controls
        console.log(this.helpLine + '\n');

        // Command to print navigation plans
      } else if (cmd === 'np') {

        // Clear console and print plans
        console.clear();
        console.log('Your Navigation Plans:');

        // 'i' numbers plans, forEach interates through them, prints, and then adds 1 to 'i'
        let i = 1;
        this.navigationPlans.forEach(plan => {
          console.log(`  ${i}: Name: ${plan.name}`);
          console.log(`     To Run Use: 'run ${plan.shortHand}'`);
          console.log('');
          i++;
        });

        // Remind user how to launch plans
        console.log(this.runLine);
        // Remind how to Print ship controls
        console.log(this.helpLine + '\n');

        // Command to print ship stats
      } else if (cmd === 'stats') {
        console.clear();

        // Create and updates the report to reflect current stats
        const report = (() => {
          return [
            `${boatName}'s Current Status:\n`,
            ` - Depth: ${this.submarine.depth} nautical meters`,
            ` - Horizontal Position: ${this.submarine.horizontalPosition} nautical meters`,
            ` - Current Positional Product: ${this.submarine.getPositionProduct()} square nautical meters`
          ];
        })();

        // Print each stat and then Remind user of controls
        report.forEach(line => console.log(line));
        console.log('\n' + this.helpLine + '\n');

        // Command to return home and reset stats to 0
      } else if (cmd === 'rt') {
        console.clear();

        // Remind the user they are already home
        if (this.notLaunched) {
          console.log(`You're already home, Captain ${name}!\n`);

          // If launched but home, open the door to ship
        } else if (!this.notLaunched && this.submarine.depth === 0 && this.submarine.horizontalPosition === 0) {
          console.log(`Opening the hatch, Captain ${name}!\n`);
          await this.delay(2000);
          console.log(`Welcome Home!\n`);

          // Launch return sequence
        } else {
          console.log(`Now heaing back home...`);
          await this.delay(5000);
          console.log(`\nHalfway there...`);
          await this.delay(3000);
          console.log(`Almost...`);
          await this.delay(2000);
          console.log(`\nAnd You've Arrived!\n`);
          console.log('Welcome Home!\n');
        };

        // Remind of controls
        this.printHelp();
        console.log('\n');

        // Reset notLuanched and set depth and horizonatal position to 0
        this.notLaunched = true;
        this.submarine.depth = 0;
        this.submarine.horizontalPosition = 0;

        // Process invalid commands from User
      } else {
        console.clear();
        console.log(`Hmm... "${cmd}" is not a control...\n\nHere's Submarine ${boatName}'s controls\n`);
        this.printHelp();
        console.log('\n');
      };

      // Only recurse processCommand if from 'node ready-captain'
      if (require.main === module) {
        this.processCommand(name, boatName);
      } else {
        // otherwise close the program
        //setTimeout(process.exit, 900);
      };
    });
  };
};

// Only start if 'node ready-captain.js' and not npm tests
if (require.main === module) {
  lets = new ReadyCaptain;
  // R you ReadyCaptain??
  lets.startTheVoyage();
};

module.exports = { ReadyCaptain };
