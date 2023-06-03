const readline = require('readline');

const { Submarine } = require('./src/submarine');
const { augustwentyCourse } = require('./src/augustwenty-course');

class ReadyCaptain {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.submarine;
    this.controls;
    this.help;
    this.notLaunched = true;

    this.navigationPlans = [
      {
        name: `Augustwenty's Course`,
        course: augustwentyCourse,
        shortHand: 'ATC'
      }
    ];
  }

  startTheVoyage() {
    console.clear();
    console.log('Ahoy Captain! \n\nWelcome To Your New Life Below The Sea!\n');

    this.rl.question("Tell me, what's your name?\n> ", (name) => {
      name = name.trim();

      console.clear();
      console.log(`Captain ${name} is purdy fine name...\n`);

      this.rl.question(`What do you wanna call your submarine, Captain ${name}?\n> `, (boatName) => {
        boatName = boatName.trim();

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
        this.helpLine = this.help[1];
        this.listPlansLine = this.help[3];
        this.runLine = this.help[4];
        this.statLine = this.help[8];

        console.clear();
        console.log(`Submarine ${boatName} sure is a great name!\n`)
        console.log(`Here's your controls for Submarine ${boatName}, Captain!\n`);
        this.printHelp();
        console.log("");
        console.log('Sooo...\n');

        this.processCommand(name, boatName);
      });
    });
  };

  printHelp() {
    this.help.forEach(line => console.log(line));
  };

  async delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };


  processCommand(name, boatName) {

    this.rl.question(`Where to, Captain ${name}?\n> `, async cmd => {
      cmd = cmd.trim().toLowerCase();

      if (cmd === 'c') {
        // Displays all ship controls
        console.clear();
        console.log(`Here's your controls for Submarine ${boatName}, Captain!\n`);
        this.printHelp();
        console.log('\n');

      } else if (cmd === 'q') {
        // Signs off and quits
        console.clear();
        console.log(`\nSea ya later, Captain ${name}!\n`)
        this.rl.close();
        process.exit();

      } else if (['forward', 'up', 'down'].indexOf(cmd.split(" ")[0]) >= 0) {
        console.clear();

        // Finds command and number and checks for extra values
        let num = parseFloat(cmd.split(' ')[1]);
        let extras = cmd.split(' ').slice(2).join(' ');
        cmd = cmd.split(' ')[0];

        // Clean up command and notify user
        if (extras) {
          console.log(`Assuming you wanted '${cmd} ${num}', ignoring '${extras}'\n`)
        }

        // Sets num to zero if falsy to prevent errors
        if (!num || typeof num !== 'number') {
          num = 0;
        }

        // Launches boat if not lanuched
        if (this.notLaunched && !(cmd === 'up' && this.submarine.depth - num <= 0)) {
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
          this.notLaunched = false;
        }

        if(cmd === 'up') {
          if(this.submarine.depth === 0) {
            console.log("You're already at the surface!\n");
          } else if (this.submarine.depth - num <= 0) {
            console.log(`Moving ${boatName} ${cmd} ${num} nautical meters!\n`)
            console.log(`You've broken to the surface, Captain ${name}!\n`)
          } else {
            console.log(`You moved ${boatName} ${cmd} ${num} nautical meters!\n`)
          }
        } else {
          console.log(`You moved ${boatName} ${cmd} ${num} nautical meters!\n`)
        }

        console.log(this.statLine);
        console.log(this.helpLine + '\n');

        // Moves boat
        this.submarine.move(cmd, num);


      } else if (cmd.trim().startsWith("run ")) {
        let plan = cmd.trim().split(' ').slice(1).join(' ');
        let planExists = false;

        for (let i = 0; i < this.navigationPlans.length; i++) {
          if (this.navigationPlans[i].name.toLowerCase() === plan || this.navigationPlans[i].shortHand.toLowerCase() === plan) {
            this.controls.executeDirections.call(this.submarine, this.navigationPlans[i].course);
            planExists = true;
            break;
          }
        }
        console.clear();

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
            this.notLaunched = false;
          }

          console.log(`Now journeying through the silent depths...`);

          await this.delay(5000);
          console.log(`\nHalfway there...`);
          await this.delay(3000);
          console.log(`Almost...`);
          await this.delay(2000);
          console.log(`\n\nAnd You've Arrived!`);
          console.log('\nWoah, that was a mighty trip!\n');
          console.log(this.statLine);

        } else {
          console.log(`Hmm... "${plan}" is not a navigation plan, Captain ${name}\n`);
          console.log('Your Navigation Plans:');
          let i = 1;
          this.navigationPlans.forEach(plan => {
            console.log(`  ${i}: Name: ${plan.name}`);
            console.log(`     To Run Use: 'run ${plan.shortHand}'`);
            console.log('');
          })
          console.log(this.runLine);
        }

        console.log(this.helpLine + '\n');

      } else if (cmd === 'np') {
        console.clear();
        console.log('Your Navigation Plans:');
        let i = 1;
        this.navigationPlans.forEach(plan => {
          console.log(`  ${i}: Name: ${plan.name}`);
          console.log(`     To Run Use: 'run ${plan.shortHand}'`);
          console.log('');
        })
        console.log(this.runLine);
        console.log(this.helpLine + '\n');
      } else if (cmd === 'stats') {
        console.clear();

        // Create and update the report to reflect current stats
        let report;
        const updateReport = () => {
          report = [
            `${boatName}'s Current Status:\n`,
            ` - Depth: ${this.submarine.depth} nautical meters`,
            ` - Horizontal Position: ${this.submarine.horizontalPosition} nautical meters`,
            ` - Current Positional Product: ${this.submarine.getPositionProduct()} square nautical meters`
          ]
        }
        updateReport();

        report.forEach(line => console.log(line));
        console.log('\n' + this.helpLine + '\n');

      } else if (cmd === 'rt') {
        console.clear();

        if (this.notLaunched) {
          console.log(`You're already home, Captain ${name}!\n`)

        } else if (!this.notLaunched && this.submarine.depth === 0 && this.submarine.horizontalPosition === 0) {
          console.log(`Opening the hatch, Captain ${name}!\n`);
          await this.delay(2000);
          console.log(`Welcome Home!\n`);

        } else {
          console.log(`Now heaing back home...`);
          await this.delay(5000);
          console.log(`\nHalfway there...`);
          await this.delay(3000);
          console.log(`Almost...`);
          await this.delay(2000);
          console.log(`\nAnd You've Arrived!\n`);
          console.log('Welcome Home!\n');
        }

        this.printHelp();
        console.log('\n');
        this.notLaunched = true;
        this.submarine.depth = 0;
        this.submarine.horizontalPosition = 0;

      } else {
        console.clear();
        console.log(`Hmm... "${cmd}" is not a control...\n\nHere's Submarine ${boatName}'s controls\n`);
        this.printHelp();
        console.log('\n');
      }

      this.processCommand(name, boatName);
    });
  }
}

// Only start if 'node ready-captain.js' and not npm tests
if (require.main === module) {
  lets = new ReadyCaptain;
  // R you ReadyCaptain??
  lets.startTheVoyage();
}

module.exports = { ReadyCaptain };
