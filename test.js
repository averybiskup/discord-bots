const Discord = require('discord.js')
const client = new Discord.Client()
const { prefix, token, server_id } = require('./config.json')

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag)
})

const purge = (msg) => {
  let amount = 1
  let flag = msg.content.split(" ")[1]

  if (flag && parseInt(flag) < 100) { amount = parseInt(flag) }

  n = msg.channel.fetchMessages({ limit: amount + 1 })
    .then(messages => msg.channel.bulkDelete(messages));
}


const sendMsg = (obj, msg) => {
  to = obj.mentions.users.first()

  to.send(msg)
    .then(message => console.log("[ " + obj.author.username + ' ] sent [ ' + to.username + ' ] : "' + msg + '"'))
    .catch(console.error);
}

client.on('message', msg => {

  // !pm [name] [content]
  if (msg.content.split(" ")[0] === prefix + 'pm') {
    let l = msg.content.split(' ')
    let text = l.slice(2, l.length).join(" ")

    sendMsg(msg, text)
  }

  if (msg.content === prefix + 'ping') {
    msg.reply('Pong!')
    msg.delete(1000)
  }

  // PURGE - !p
  if (msg.content.split(" ")[0] === prefix + "p") {
    purge(msg)
  }
})

client.login(token)
