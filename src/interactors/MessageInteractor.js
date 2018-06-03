module.exports = function MessageInteractor (server) {
  const channel = server.app.channel

  return { register }

  function register (message) {
    channel.publish('conversationOutgoing', '', new Buffer(message))
  }
}
