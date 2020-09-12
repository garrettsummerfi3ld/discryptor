// Environment variables (bot tokens, CI, etc)
require('dotenv').config();

console.log('[' + new Date().toUTCString() + '] Loading modules...');
const config = require('./config.json');
const Discord = require('discord.js');
const crypto = require('crypto-js');
const client = new Discord.Client();
console.log('[' + new Date().toUTCString() + '] Loaded modules');

// Default embed
const defaultEmbed = {
	color: 0x600fbd,
	author: {
		name: 'discryptor',
		url: 'https://github.com/garrettsummerfi3ld/discryptor',
	},
	timestamp: new Date(),
	footer: {
		text: 'Created by unlucky dem0n#0001',
		icon_url: 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4',
	},
};

// Login process with Discord
console.log('[' + new Date().toUTCString() + '] Starting up...');
client.on('ready', async () => {
	console.log('       ___                            __\r\n  ____/ (_)________________  ______  / /_____  _____\r\n / __  / / ___/ ___/ ___/ / / / __ \\/ __/ __ \\/ ___/\r\n/ /_/ / (__  ) /__/ /  / /_/ / /_/ / /_/ /_/ / /\r\n\\__,_/_/____/\\___/_/   \\__, / .___/\\__/\\____/_/\r\n                      /____/_/');
	console.log('[' + new Date().toUTCString() + '] ' + `Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'with numbers',
		},
	});
	console.log('[' + new Date().toUTCString() + '] Done loading!');
});

client.on('message', async msg => {
	if (!msg.content.startsWith(config.prefix)) return;

	const withoutPrefix = msg.content.slice(config.prefix.length);
	const split = withoutPrefix.split(/ +/);
	const cmd = split[0];
	const args = split.slice(1);

	// Help page
	if (cmd === 'help') {
		console.log('[' + new Date().toUTCString() + '] Caught "$help" arg');
		defaultEmbed.title = 'Help';
		defaultEmbed.description = 'All the commands and functions of the bot';
		defaultEmbed.fields = [
			{ name: '`$help`', value: 'This help page', inline: true },
			{ name: '`$about`', value: 'Credits to who made the bot', inline: true },
			{ name: '`$encrypt`', value: 'Encrypts with a given string with a specified hash/cipher', inline: true },
			{ name: '`$decrypt`', value: 'Decrypts with a given string with a specified hash/cipher', inline: true },
		];

		return msg.reply({ embed: defaultEmbed });
	}

	// About page
	if (cmd === 'about') {
		console.log('[' + new Date().toUTCString() + '] Caught "$about" arg');
		defaultEmbed.title = 'About the bot';
		defaultEmbed.fields = [
			{ name: 'unlucky dem0n#0001', value: 'Creator of the bot', inline: true },
			{ name: '\u200b', value: '\u200b', inline: false },
			{ name: 'GitHub page', value: 'https://github.com/garrettsummerfi3ld/discryptor', inline: true },
		];

		return msg.reply({ embed: defaultEmbed });
	}

	// Encrypt
	if (cmd === 'encrypt') {
		console.log('[' + new Date().toUTCString() + '] Caught "$encrypt" arg');
		if (!args.length) {
			console.log('[' + new Date().toUTCString() + '] No args found!');
			const embed = new Discord.MessageEmbed()
				.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
				.setTitle('Encrypt')
				.setColor('#802019')
				.setDescription('Encrypt a string of text')
				.addField('Error', 'No other arguments provided!', true)
				.addField('Supported methods of encryption/hashing', 'MD5, AES', true)
				.setTimestamp()
				.setFooter('Created by unlucky dem0n#0001', 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4');

			console.log('[' + new Date().toUTCString() + '] Returning error embed');
			return msg.reply({ embed: embed });
		}

		// MD5
		if (args[0] === 'md5') {
			console.log('[' + new Date().toUTCString() + '] Caught "md5" arg');
			const string = args[1];

			if (string != null || string != '') {
				console.log('"string" var is not empty or null');
				const cipherText = crypto.MD5(string);

				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#600fbd')
					.setDescription('MD5 Encryption')
					.addField('Encrypted MD5 string', '`' + cipherText + '`', true)
					.setTimestamp()
					.setFooter('Created by unlucky dem0n#0001', 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4');

				console.log('[' + new Date().toUTCString() + '] Returning MD5 embed');

				return msg.reply({ embed: embed });
			}

			else if (string == null || string == '') {
				console.log('[' + new Date().toUTCString() + '] "string" var is empty or null');
				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#802019')
					.setDescription('MD5 Encryption page')
					.addField('Arguments', 'All the arguments needed for this function', true)
					.addField('`md5 [message]`', 'Hash message using MD5', true)
					.setTimestamp()
					.setFooter('Created by unlucky dem0n#0001', 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4');

				console.log('[' + new Date().toUTCString() + '] Returning error log');

				return msg.reply({ embed: embed });
			}
		}

		// AES
		if (args[0] === 'aes') {
			console.log('[' + new Date().toUTCString() + '] Caught "aes" arg');
			const string = args[1];
			const pass = args[2];

			if (string != null || string != '') {
				console.log('[' + new Date().toUTCString() + '] "string" var is not empty or null');
				const cipherText = crypto.AES.encrypt(string, pass);

				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#600fbd')
					.setDescription('AES Encryption')
					.addField('Encrypted AES string', '`' + cipherText + '`', true)
					.setTimestamp()
					.setFooter('Created by unlucky dem0n#0001', 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4');

				console.log('[' + new Date().toUTCString() + '] Returning AES embed');

				return msg.reply({ embed: embed });
			}

			else if (string == null || string == '') {
				console.log('[' + new Date().toUTCString() + '] "string" var is empty or null');
				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#802019')
					.setDescription('Encrypt a string of text')
					.addField('Error', 'No string to encrypt provided!', true)
					.setTimestamp()
					.setFooter('Created by unlucky dem0n#0001', 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4');

				console.log('[' + new Date().toUTCString() + '] Returning error log');

				return msg.reply({ embed: embed });
			}
		}

		// SHA1
		if (args[0] === 'sha1') {
			console.log('[' + new Date().toUTCString() + '] Caught "sha1" arg');
			const string = args[1];

			if (string != null || string != '') {
				console.log('[' + new Date().toUTCString() + '] "string" var is not empty or null');
				const cipherText = crypto.SHA1(string);

				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setDescription('SHA1 Encryption')
					.addField('Encrypted SHA1 string', '`' + cipherText + '`', true);

				console.log('[' + new Date().toUTCString() + '] Returning SHA1 embed');

				return msg.reply({ embed: embed });
			}

			else if (string == null || string == '') {
				console.log('[' + new Date().toUTCString() + '] "string" var is empty or null');
				const embed = new Discord.MessageEmbed()
					.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
					.setTitle('Encrypt')
					.setColor('#802019')
					.setDescription('Encrypt a string of text')
					.addField('Error', 'No string to encrypt provided!', true)
					.setTimestamp()
					.setFooter('Created by unlucky dem0n#0001', 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4');

				console.log('[' + new Date().toUTCString() + '] Returning error log');

				return msg.reply({ embed: embed });
			}
		}
	}

	// Decrypt
	if (cmd === 'decrypt') {
		console.log('[' + new Date().toUTCString() + '] Caught "$decrypt" arg');
		if (!args.length) {
			const embed = new Discord.MessageEmbed()
				.setAuthor('discryptor', '', 'https://github.com/garrettsummerfi3ld/discryptor')
				.setTitle('Decrypt')
				.setColor('#802019')
				.setDescription('Decrypt a string of text')
				.addField('Error', 'No other arguments provided!', true)
				.setTimestamp()
				.setFooter('Created by unlucky dem0n#0001', 'https://avatars3.githubusercontent.com/u/7040719?s=460&u=37552b6ea1c2f4ec5fe1ac25c2095eae036d2170&v=4');

			return msg.reply({ embed: embed });
		}
	}
});

try {
	client.login(process.env.TOKEN);
}
catch (e) {
	console.error('[' + new Date().toUTCString() + '] UNKNOWN ERROR, PRINTING STACKTRACE');
	console.error('[' + new Date().toUTCString() + '] REPORT THIS TO GITHUB REPO: https://github.com/garrettsummerfi3ld/discryptor/issues');
	console.error(e);
}