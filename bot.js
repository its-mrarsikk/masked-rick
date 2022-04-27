// Setup
const Discord = require('discord.js');
const {
    Song
} = require('distube');
const Client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES]
});
const Prefix = process.env.PREFIX;
const DisTube = require('distube');
const Distube = new DisTube.DisTube(Client);
Client.on('ready', async () => {
    console.log('Bot ready: ' + Client.user.tag + "(ID: " + Client.user.id + ")")
});
// Code

Client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('m!')) {
        const args = message.content.slice('m!'.length).trim().split(/ +/g)
        const command = args.shift();
        const infoAliases = ['info', 'i', 'inf', 'about', 'a'];
        const playAliases = ['play', 'p', 'go', 'm']
        const stopAliases = ['stop', 's', 'disconnect', 'dis', 'd', 'stfu', 'shut']
        const helpAliases = ['help', 'h', 'hlp', 'commands', 'c', 'cmd', 'cmds']

        if (infoAliases.includes(command)) {
            const membed = new Discord.MessageEmbed()
                .setTitle("About MuzPro")
                .setColor(0x00AE86)
                .setDescription("Hello! This is a basic music bot! Run m!help for command list! Written by <@867220425276260353>.")
                .setFooter("MuzPro bot", "https://i.imgur.com/7LxOFKY.png")
                .setImage("https://i.imgur.com/7LxOFKY.png");
            message.channel.send({
                embed: membed
            })
        }
        if (helpAliases.includes(command)) {
            const membed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('MuzPro Help')
                .setDescription('List of commands and aliases.')
                .addFields({
                    name: '▶ Play',
                    value: 'Plays the specified song.\nAliases: p, go, m'
                }, {
                    name: '⏹ Stop',
                    value: 'Disconnects the bot.\nAliases: s, disconnect, dis, d, stfu, shut'
                }, {
                    name: '📘 Info [HELPER]',
                    value: 'Displays an info embed.',
                    inline: true
                }, {
                    name: '📘 Help [HELPER]',
                    value: 'Displays this embed.',
                    inline: true
                })
                .setTimestamp()
                .setFooter({
                    text: 'MuzPro'
                });

            message.channel.send('**To use commands, message** `m!command`**, where** `command` **is the real command, e. g**    `play`. **All commands is lower-case. Use** `m!command` **instead of any form that contains upper-case letters.**', {
                embed: membed
            })
        }
        if (playAliases.includes(command)) {
            if (!message.member.voice.channel) return message.channel.send('Join a channel first!')
            Distube.play(message.member.voice.channel, 'https://youtu.be/dQw4w9WgXcQ');
            message.channel.send('Playing Rickroll :smiling_imp:')
        }
        if (stopAliases.includes(command)) {
            const bot = message.guild.members.cache.get(Client.user.id);
            if (message.member.voice.channel !== bot.voice.channel) return message.channel.send('You are not in my voice channel! Join it first.');
            Distube.stop(message);
            message.channel.send('Stopped the rickroll.')
        }
    }
});

// Running bot
Client.login(process.env.DISCORD_TOKEN);
