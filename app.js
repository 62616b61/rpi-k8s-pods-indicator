const Raspi = require('raspi-io')
const five = require('johnny-five')

const Api = require('kubernetes-client')
const core = new Api.Core(Object.assign(
  {},
  Api.config.getInCluster(),
  { namespace: 'default' }
))

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

  setInterval(function() {
    core.namespaces.pods.get((err, res) => {
      const pods = res.items.length
      register.display(pods <= 9 ? pods : 9)
    })
  }, 5000)
})
