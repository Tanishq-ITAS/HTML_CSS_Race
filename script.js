/**
 * The comments through this file indicate the expected functionality
 * required to complete the exercise.
 */

/**
 * This is the base Animal class; all Rabbits will extend this class.
 */
class Animal {
  constructor(name) {
    this._speed = 0;
    this._name = name;
  }

  getSpeed() {
    return this._speed;
  }

  getName() {
    return this._name;
  }
}

/**
 * This is the Rabbit class; all new Rabbits that are created will call the
 * constructor of this class to instantiate a new rabbit object.
 */
class Rabbit extends Animal {
  constructor(name) {
    super(name);
  }

  hop(speed) {
    // Prevent negative numbers from interferring with speed
    // ...
    this._speed += speed;
    if(this._speed < 0) {
      this._speed = 0;
    }
  }

  stop() {
    this._speed = 0;
  }

  getRacerId() {
    return this._name.toLowerCase().replace(/\s+/, '-');
  }
}

// Declare two global variables:
// - one to house all rabbit instances
// - one to store the timer id from setInterval
var rabbitsArray = [], timer;

function getRandomSpeed() {
  // Return a random whole number between 1 and 10
  return Math.floor(Math.random() * 10) + 1;
}

function initRace() {
  // Enable the Stop button
  document
    .querySelector('.js-btn-stop-race')
    .disabled = false;

  // Create 4 new Rabbit instances with names like 'Rabbit 1' through to 'Rabbit 4'.
  // Remember: the name is passed to the constructor!
  var rabbit1 = new Rabbit('Rabbit 1');
  var rabbit2 = new Rabbit('Rabbit 2');
  var rabbit3 = new Rabbit('Rabbit 3');
  var rabbit4 = new Rabbit('Rabbit 4');

  // Create a global array containing all of the rabbit objects you created above.
  rabbitsArray.push(rabbit1, rabbit2, rabbit3, rabbit4);


  // Assign the timer id that is returned from the setInterval call above with 500ms intervals to the global variable `timer`
  timer = setInterval(function() {
    // Loop through all the rabbits
    rabbitsArray.forEach(function(rabbit, rabbitIndex) {
      // Call `.hop(getRandomSpeed())` on each rabbit
      rabbit.hop(getRandomSpeed());

      // NOTE: This is what moves the rabbit to the right from the start line.
      // We use the `calc` function in CSS to calculate the speed across the screen in `vw` units
      // and subtract 10rem units (half the width of our 20rem wide rabbit images) so we get the center of the rabbit image.
      // Uncomment this line below when you get this far
      // const calculatedValue = `calc(${speed <= 6 ? 6 : speed}vw - 10rem)`;
      var speed = rabbit.getSpeed();
      const calculatedValue = `calc(${speed <= 6 ? 6 : speed}vw - 10rem)`;

      // Get the rabbit image by it's class name using `.getRacerId()` and add a `left: ...;` style using the previous calculated value
      var rabbitImg = document.getElementById(rabbit.getRacerId());
      if(rabbitImg !== null)
        rabbitImg.style.left = calculatedValue;

    });

    // Determine the winner here by filtering the rabbits and returning the ones with a speed greater than or equal to 98
    var winnersArray = rabbitsArray.filter(function(rabbit) {
      return rabbit.getSpeed() >= 98;
    });
    // If the filtered winners array length is greater than 1
    if(winnersArray.length >= 1){
      // Alert the name of the rabbit that won the race
      alert(winnersArray[0].getName()+' won the race!');

      // Disable the stop button
      document
        .querySelector('.js-btn-stop-race')
        .disabled = true;

      // Call `stopRace()`
      stopRace();
    }
  }, 500);
}

function stopRace() {
  // Loop over all the rabbits and call `.stop()` on each rabbit
  rabbitsArray.forEach(function(rabbit, rabbitIndex) {
    rabbit.stop();
  });
  // Clear the `timer` interval
  clearInterval(timer);
}

/**
 * domReady is a 3rd-party library that is loaded in the HTML file and used here.
 * It exposes a utility function that we call which takes a callback as the
 * first and only argument to it, which we use to call our own code to initialize the page.
 */
domready(() => {
  document
    .querySelector('.js-btn-start-race')
    .addEventListener('click', () => {
      alert('Starting the race!');
      initRace();
    });

  document
    .querySelector('.js-btn-stop-race')
    .addEventListener('click', () => {
      stopRace();
      alert('Stopping the race!');
    });
});
