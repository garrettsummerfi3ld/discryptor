require('dotenv').config();

const Discord = require('discord.js');
const { type } = require('os');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('       ___                            __\r\n  ____/ (_)________________  ______  / /_____  _____\r\n / __  / / ___/ ___/ ___/ / / / __ \\/ __/ __ \\/ ___/\r\n/ /_/ / (__  ) /__/ /  / /_/ / /_/ / /_/ /_/ / /\r\n\\__,_/_/____/\\___/_/   \\__, / .___/\\__/\\____/_/\r\n                      /____/_/');
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'with numbers',
		},
	});
});


client.on('message', msg => {
	if (msg.content === '$ping') {
		msg.reply('Pong!');
	}
});

client.login(process.env.TOKEN);