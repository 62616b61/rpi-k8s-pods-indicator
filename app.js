const Raspi = require('raspi-io')
const five = require('johnny-five')

const board = new five.Board({
  repl: false,
  io: new Raspi()
})

board.on('ready', () => {
  const register = new five.ShiftRegister({
    isAnode: false,
    pins: {
      data: 'P1-11',
      clock: 'P1-15',
      latch: 'P1-13',
      reset: 'P1-7'
    }
  })
  register.reset()

  var number = 1;
  var decimal = 0;

  // Display numbers 0-9, one at a time in a loop.
  // Shows just the number for a half second, then
  // the number + a decimal point for a half second.
  setInterval(function() {
    register.display(number + (decimal && "."));

    if (decimal) {
      number++;
    }

    if (number > 9) {
      number = 0;
    }

    decimal ^= 1;
  }, 500);
})
