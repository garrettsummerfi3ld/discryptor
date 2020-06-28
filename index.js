require('dotenv').config();

const config = require('./config.json');
const Discord = require('discord.js');
const crypto = require('crypto-js');
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

function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

client.on('message', msg => {
	if (!msg.content.startsWith(config.prefix)) return;

	const withoutPrefix = msg.content.slice(config.prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);
	if (command === 'help') {
		const embed = new Discord.MessageEmbed()
			.setAuthor('discryptor', 'https://github.com/garrettsummerfi3ld/discryptor')
			.setTitle('discryptor Help Page')
			.setColor('#600fbd')
			.setDescription('All the commands and functions of the bot')
			.setURL('https://https://github.com/garrettsummerfi3ld/discryptor')
			.addField('Under construction!', 'Check in on the GitHub repo for more updates!', true)
			.setTimestamp();

		Discord.Channel.send(embed); // maybe : msg.channel.send(embed);
	}
});


client.login(process.env.TOKEN);
