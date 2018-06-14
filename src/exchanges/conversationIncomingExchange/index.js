exports.plugin = {
  name: 'conversationIncomingExchange',
  register: async (server, options) => {
    const channel = server.app.channel
    const queue = await channel.assertQueue('conversationIncoming')

    await channel.assertExchange(
      'conversationIncoming',
      'fanout',
      { durable: false }
    )

    await channel.bindQueue(queue.queue, 'conversationIncoming', '')

    channel.consume('conversationOutgoing', msg => {
      channel.publish('conversationIncoming', '', msg.content)
    })
  }
}
