const conversationIncomingExchange = require('./conversationIncomingExchange')
const conversationOutgoingExchange = require('./conversationOutgoingExchange')

exports.plugin = {
  name: 'exchanges',
  register: async (server, options) => {
    await server.register([
      conversationOutgoingExchange,
      conversationIncomingExchange
    ])
  }
}
