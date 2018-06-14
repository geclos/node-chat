exports.plugin = {
  name: 'conversationIncomingExchange',
  register: async (server, options) => {
    const broker = server.app.broker
    const channel = await broker.createChannel()
    const queue = await channel.assertQueue('conversationIncoming', {exclusive: true})
    await channel.assertExchange(
      'conversationIncoming',
      'fanout',
      { durable: false }
    )

    channel.consume('conversationOutgoing', msg => {
      channel.publish('conversationIncoming', '', msg.content)
    })
  }
}
