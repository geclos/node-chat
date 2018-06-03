const amqp = require('amqplib')

exports.plugin = {
  name: 'rabbitmq',
  register: async (server, options) => {
    const broker = await amqp.connect('amqp://localhost')
    server.app.broker = broker
  }
}
