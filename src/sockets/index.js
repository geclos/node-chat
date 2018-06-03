const MessageInteractor = require('../interactors/MessageInteractor')

exports.plugin = {
  name: 'sockets',
  register: (server, options) => {
    const messageInteractor = MessageInteractor(server)
    const io = require('socket.io')(server.listener)

    io.on('connection', socket => {
      socket.on('message', messageInteractor.register)
      socket.on('disconnect', () => console.log('user disconnected'))
    })
  }
}
