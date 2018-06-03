exports.plugin = {
  name: 'conversationOutgoingExchange',
  register: async (server, options) => {
    const broker = server.app.broker
    const channel = await broker.createChannel()
    const queue = await channel.assertQueue('conversationOutgoing', {exclusive: true})
    const exchange = await channel.assertExchange(
      'conversationOutgoing',
      'fanout',
      { durable: false }
    )

    await channel.bindQueue(queue.queue, 'conversationOutgoing', '')



    if (!server.app.exchanges) {
      server.app.channel = channel
      return
    }

    server.app.exchanges.conversationOutgoing = channel
  }
}
