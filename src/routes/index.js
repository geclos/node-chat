exports.plugin = {
  name: 'routes',
  register: (server, options) => {
    server.route({
      method: 'GET',
      path: '/',
      handler: {
        file: 'index.html'
      }
    })
  }
}
