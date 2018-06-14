exports.plugin = {
  name: 'conversationOutgoingExchange',
  register: async (server, options) => {
    const channel = server.app.channel
    const queue = await channel.assertQueue('conversationOutgoing')
    await channel.assertExchange(
      'conversationOutgoing',
      'fanout',
      { durable: false }
    )

    await channel.bindQueue(queue.queue, 'conversationOutgoing', '')
  }
}
