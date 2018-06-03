const rabbitmq = require('./rabbitmq')

exports.plugin = {
  name: 'middlewares',
  register: async (server, options) => {
    await server.register([ rabbitmq ])
  }
}
