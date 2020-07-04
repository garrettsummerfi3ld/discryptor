// Environment variables (bot tokens, CI, etc)
require('dotenv').config();

console.log('Loading modules...');
const config = require('./config.json');
const Discord = require('discord.js');
const crypto = require('crypto-js');
const client = new Discord.Client();
console.log('Loaded modules');

// Login process with Discord
console.log('Starting up...');
client.on('ready', async => {
	console.log('       ___                            __\r\n  ____/ (_)________________  ______  / /_____  _____\r\n / __  / / ___/ ___/ ___/ / / / __ \\/ __/ __ \\/ ___/\r\n/ /_/ / (__  ) /__/ /  / /_/ / /_/ / /_/ /_/ / /\r\n\\__,_/_/____/\\___/_/   \\__, / .___/\\__/\\____/_/\r\n                      /____/_/');
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'with numbers',
		},
	});
	console.log('Done loading!');
});

client.on('message', msg => {
	if (!msg.content.startsWith(config.prefix)) return;

	const withoutPrefix = msg.content.slice(config.prefix.length);
	const split = withoutPrefix.split(/ +/);
	const command = split[0];
	const args = split.slice(1);

	// Help page
	if (command === 'help') {
		const embed = new Discord.MessageEmbed()
			.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
			.setTitle('Help')
			.setColor('#600fbd')
			.setDescription('All the commands and functions of the bot')
			.addField('Under construction!', 'Check in on the GitHub repo for more updates!', true)
			.setTimestamp();

		return msg.channel.send({ embed: embed });
	}

	// Encrypt
	if (command === 'encrypt') {
		if (!args.length) {
			const embed = new Discord.MessageEmbed()
				.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
				.setTitle('Encrypt')
				.setColor('#802019')
				.setDescription('Encrypt a string of text')
				.addField('Error', 'No other arguments provided!', true)
				.setTimestamp();

			return msg.channel.send({ embed: embed });
		}
	}

	// Decrypt
	if (command === 'decrypt') {
		if (!args.length) {
			const embed = new Discord.MessageEmbed()
				.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
				.setTitle('Decrypt')
				.setColor('#802019')
				.setDescription('Decrypt a string of text')
				.addField('Error', 'No other arguments provided!', true)
				.setTimestamp();

			return msg.channel.send({ embed: embed });
		}
	}
});

try {
	client.login(process.env.TOKEN);
}
catch (e) {
	console.error('UNKNOWN ERROR, PRINTING STACKTRACE');
	console.error('REPORT THIS TO GITHUB REPO: https://github.com/garrettsummerfi3ld/discryptor/issues');
	console.error(e);
}