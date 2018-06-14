const UserExchange = require('./UserExchange')

exports.plugin = {
  name: 'sockets',
  register: async (server, options) => {
    const channel = server.app.channel
    const userExchange = await UserExchange(server)
    const io = require('socket.io')(server.listener, { path: '/hapi' })

    channel.consume('conversationIncoming', msg => {
      channel.publish(userExchange.name(), '', msg.content)
    })

    io.on('connection', async socket => {
      socket.on('message', msg => {
        if (!msg) return
        channel.publish('conversationOutgoing', '', new Buffer(msg))
      })

      const q = await userExchange.registerUser(socket.id)
      channel.consume(q.queue, msg => {
        if (!msg) return
        socket.emit('chat message', msg.content.toString())
      })

      socket.on('disconnect', () => {
        userExchange.dropUser(socket.id)
      })
    })
  }
}
