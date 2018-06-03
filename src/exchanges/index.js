const conversationIncomingExchange = require('./conversationIncomingExchange')
const conversationOutgoingExchange = require('./conversationOutgoingExchange')
const userExchange = require('./userExchange')

exports.plugin = {
  name: 'exchanges',
  register: async (server, options) => {
    await server.register([
      conversationOutgoingExchange,
      conversationIncomingExchange,
      userExchange
    ])
  }
}
