class NavigationControls {

  static interpetPlan(starter) {
    // check if plan is a string
    if (typeof starter === 'string') {

      // turn string into an array
      return extractPlansFromString(starter);

      // check if plan is an array
    } else if (Array.isArray(starter)) {

      // if array leave alone
      return starter;
    };

    function extractPlansFromString(str) {
      // Remove line breaks
      str = str.replace(/\n/g, " ");
      // Remove extra spaces and trim string
      str = str.replace(/\s+/g, " ").trim();
      // Split the string into an array using space as the delimiter
      var plan = str.split(" ");

      // Process each value in the array
      for (var i = 0; i < plan.length; i++) {
        var value = plan[i];

        // Check if the value is a number
        if (!isNaN(value)) {
          // Convert numeric strings to numbers
          plan[i] = parseFloat(value);
        } else {
          // Handle other special values
          plan[i] = value.toLowerCase();
        }
      }

      // Filter out empty values
      plan = plan.filter(function (value) {
        return value !== "";
      });

      // Make the first value a command
      function firstIsCommand(plan) {
        // Check if first value is not not (is) a number
        if (!isNaN(plan[0])) {

          // Remove the first value a number
          plan.shift();

          // Check recursively until first value isn't a number
          return firstIsCommand(plan);
        }

        //return the plan to previous function
        return plan;
      }

      plan = firstIsCommand(plan);

      // Return the resulting array
      return plan;
    }


  };

  executeDirections(starter) {
    // Turn starter into executable plan
    const plan = NavigationControls.interpetPlan(starter);

    // iterate by 2 to evaluate commands
    for (let i = 0; i < plan.length; i += 2) {
      // command is the first value each time
      const command = plan[i];
      // num is the second
      const num = plan[i + 1];

      // fire our existing commands
      if (command === 'forward') {
        this.forward(num);
      } else if (command === 'down') {
        this.down(num);
      } else if (command === 'up') {
        this.up(num);
      } else {
        // skip command and num if invalid comand
        i += 2
      }
    }
  }
};

module.exports = { NavigationControls };
