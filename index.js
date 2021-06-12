const discord = require(`discord.js`);
//require discord
const dateFormat = require(`dateFormat`);
//require dateFormat
const fs = require(`fs`);
//require FileSystem
const Sequelize = require('sequelize');
//require Sequelize
const dotenv = require(`dotenv`).config()
//require dotenv


const client = new discord.Client();
//define discord client
const WebhookRLY = new discord.WebhookClient(process.env.webhookuid, process.env.WEBHOOKTKN)
//define discord webhook client
client.login(process.env.TOKEN).then()
//discord client login
const fileLog = fs.createWriteStream(`messageLog.txt`, {
    flags: `a`
})
//append files

const channelsAry = ["671892042288332821", "741972500094779392"]
//monitored channels array

const DBConnection = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
    host: process.env.DBHOST,
    dialect: `mysql`,
    logging: false
})
//connect to DB

const chatDB = DBConnection.define(`chatLogs`, {
    Author: {
        type: Sequelize.STRING,
        unique: false
    },
    content: Sequelize.TEXT,
    channel: Sequelize.STRING,
    time: Sequelize.STRING
})
//config the SQL things

client.once(`ready`, () => {
    chatDB.sync().then()
    //make tables
    console.log(`ready`)
    //notify alive
    client.user.setStatus(`invisible`).then()
    //hide online status
})

client.on(`message`,  async message => {
    if ((channelsAry.includes(message.channel.id))) {
    try {await chatDB.create({
        Author: message.author.id,
        content: message.content,
        channel: message.channel.id,
        time: Number(new Date())
    })} catch (err) {console.log(err)}}
    if (message.channel.id === `671892042288332821`) {
        try {
            await Object.defineProperty(global, "channelName", {value: "#staff-chat"})
            const Time = new Date
            await fileLog.write(`[${dateFormat(Time, `GMT:dd:mm:yyyy`)} ${dateFormat(Time, `GMT:HH:MM:ss`)}] ${channelName} (${message.author.username}#${message.author.discriminator}): ${message.content}\n`)
            await WebhookRLY.send(message.content, {avatarURL: message.author.avatarURL({format: "webp", dynamic: true}), username: message.author.username})
        } catch (error) {console.log(error)}
    } else if (message.channel.id === `741972500094779392`) {
        try {
            await Object.defineProperty(global, "channelName", {value: "#developer-chat"})
            const Time = new Date()
            await fileLog.write(`[${dateFormat(Time, `GMT:dd:mm:yyyy`)} ${dateFormat(Time, `GMT:HH:MM:ss`)}] ${channelName} (${message.author.username}#${message.author.discriminator}): ${message.content}\n`)
            await WebhookRLY.send(message.content, {avatarURL: message.author.avatarURL({format: "webp", dynamic: true}), username: message.author.username})
        } catch (error) {console.log(error)}
    }
})

//umm it's complicated so why don't you just read it.