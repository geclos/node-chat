const MessageInteractor = require('../interactors/MessageInteractor')

exports.plugin = {
  name: 'sockets',
  register: (server, options) => {
    const broker = server.app.broker
    const messageInteractor = MessageInteractor(server)
    const io = require('socket.io')(server.listener)

    io.on('connection', async socket => {
      socket.on('message', messageInteractor.register)

      const channel = await broker.createChannel()
      channel.consume('conversationIncoming', msg => {
        socket.emit(msg.content.toString())
      })

      socket.on('disconnect', () => console.log('user disconnected'))
    })
  }
}
