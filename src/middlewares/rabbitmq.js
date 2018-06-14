const amqp = require('amqplib')

exports.plugin = {
  name: 'rabbitmq',
  register: async (server, options) => {
    const broker = await amqp.connect('amqp://localhost')
    const channel = await broker.createChannel()
    server.app.channel = channel
  }
}
