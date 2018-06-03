const Hapi = require('hapi')
const Path = require('path')
const middlewares = require('./middlewares')
const exchanges = require('./exchanges')
const sockets = require('./sockets')

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
    middlewares,
    exchanges,
    sockets
  ])

  server.start()
  console.log(`server listening on port: ${server.info.port}`)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
