// Environment variables (bot tokens, CI, etc)
require('dotenv').config();

console.log('Loading modules...');
const config = require('./config.json');
const Discord = require('discord.js');
const crypto = require('crypto-js');
const client = new Discord.Client();
console.log('Loaded modules');

// Vars
const today = new Date();
const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
const dateTime = date + ' ' + time;

// Login process with Discord
console.log('Starting up...');
client.on('ready', async () => {
	console.log('       ___                            __\r\n  ____/ (_)________________  ______  / /_____  _____\r\n / __  / / ___/ ___/ ___/ / / / __ \\/ __/ __ \\/ ___/\r\n/ /_/ / (__  ) /__/ /  / /_/ / /_/ / /_/ /_/ / /\r\n\\__,_/_/____/\\___/_/   \\__, / .___/\\__/\\____/_/\r\n                      /____/_/');
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'with numbers',
		},
	});
	console.log('Done loading!');
	console.log('Time started at ' + dateTime);
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
			.addField('$encrypt', 'Encrypts a string of text provided', true)
			.addField('$decrypt', 'Decrypts a string of text provided', true)
			.setTimestamp();

		return msg.channel.send({ embed: embed });
	}

	// Encrypt
	if (command === 'encrypt') {
		console.log('Caught "$encrypt" arg');
		if (!args.length) {
			console.log('No args found!');
			const embed = new Discord.MessageEmbed()
				.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
				.setTitle('Encrypt')
				.setColor('#802019')
				.setDescription('Encrypt a string of text')
				.addField('Error', 'No other arguments provided!', true)
				.setTimestamp();

			console.log('Returning error embed');
			return msg.channel.send({ embed: embed });
		}

		if (args[0] === 'md5') {
			console.log('Caught "md5" arg');
			const string = args[1];

			if (string != null || string != '') {
				console.log('"string" var is not empty or null');
				const cipherText = crypto.MD5(string);

				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#600fbd')
					.setDescription('MD5 Encryption')
					.addField('Encrypted MD5 string', cipherText, true)
					.setTimestamp();

				console.log('Returning MD5 embed');

				return msg.channel.send({ embed: embed });
			}
			else if (string == null || string == '') {
				console.log('"string" var is empty or null');
				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#802019')
					.setDescription('MD5 Encryption page')
					.addField('Arguments', 'All the arguments needed for this function', true)
					.addField('')
					.setTimestamp();

				console.log('Returning error log');

				return msg.channel.send({ embed: embed });
			}
		}

		if (args[0] === 'aes') {
			console.log('Caught "aes" arg');
			const string = args[1];
			const pass = args[2];

			if (string != null || string != '') {
				console.log('"string" var is not empty or null');
				const cipherText = crypto.AES.encrypt(string, pass);

				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#600fbd')
					.setDescription('AES Encryption')
					.addField('Encrypted AES string', cipherText, true)
					.setTimestamp();

				console.log('Returning MD5 embed');

				return msg.channel.send({ embed: embed });
			}
			else if (string == null || string == '') {
				console.log('"string" var is empty or null');
				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#802019')
					.setDescription('Encrypt a string of text')
					.addField('Error', 'No string to encrypt provided!', true)
					.setTimestamp();

				console.log('Returning error log');

				return msg.channel.send({ embed: embed });
			}
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