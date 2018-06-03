const Hapi = require('hapi')
const Path = require('path')
const routes = require('./routes')

const server = new Hapi.Server({
  port: 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: Path.join(__dirname, 'public')
    }
  }
})

const init = async () => {
  await server.register([
    require('inert'),
    routes
  ])

  const io = require('socket.io')(server.listener)
  io.on('connection', socket => {
    console.log('user connected')

    socket.on('chat message', msg => io.emit('chat message', msg))
    socket.on('disconnect', () => console.log('user disconnected'))
  })

  server.start()
  console.log(`server listening on port: ${server.info.port}`)
}

// TODO: error handling

init()
