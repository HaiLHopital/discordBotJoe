const { Client, Intents } = require("discord.js");
const { jokerDoc, commandDoc } = require('./firestore')
require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
    let commandList, jokerQ;

    channel = client.channels.cache.get(message.channel.id);

    jokerQ = await jokerDoc.get();
    commandList = await commandDoc.get();

    jokerQ = jokerQ.data().qoute;
    commandList = commandList.data()

    if (message.author.bot) return;
    if (!message.content.startsWith("!")) return;

    const commandBody = message.content.slice(1);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command == "joker") {
        channel.send(jokerQ[getRandom(0, jokerQ.length - 1)])
        return;
    }

    if (Object.keys(commandList).includes(command)) {
        console.log("command from list called");
        channel.send(commandList[command])
    } else {

        const kekw = client.emojis.cache.find(emoji => emoji.name === "KEKW")
        console.log(`Unknown command '${command}' `);
        channel.send(`Unknown command ${kekw} `)
    }
})

client.login(process.env.BOT_TOKEN);