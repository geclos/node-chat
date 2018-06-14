module.exports = async function UserExchange (server) {
  const ex = 'users'
  const channel = server.app.channel

  await channel.assertExchange(ex, 'fanout', {durable: false})

  return {
    name,
    dropUser,
    registerUser
  }

  function name () {
    return ex
  }

  async function registerUser (id) {
    const q = await channel.assertQueue(id)
    await channel.bindQueue(q.queue, ex, '')
    return q
  }

  function dropUser (id) {
    channel.deleteQueue(id)
  }
}
