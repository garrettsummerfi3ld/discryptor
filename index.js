// Environment variables (bot tokens, CI, etc)
require('dotenv').config();

console.log('[' + new Date().toUTCString() + '] Loading modules...');
const config = require('./config.json');
const Discord = require('discord.js');
const crypto = require('crypto-js');
const client = new Discord.Client();
console.log('[' + new Date().toUTCString() + '] Loaded modules');

// Default embed
const embed = {
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

client.login(process.env.TOKEN);

client.on('message', async msg => {
    try {
        if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

        const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        // Help page
        if (cmd === 'help') {
            console.log('[' + new Date().toUTCString() + '] Caught "$help" cmd');
            embed.title = 'Help';
            embed.description = 'All the commands and functions of the bot';
            embed.fields = [
                { name: '`$help`', value: 'This help page', inline: false },
                { name: '`$about`', value: 'Credits to who made the bot', inline: false },
                { name: '`$encrypt`', value: 'Encrypts with a given string with a specified hash/cipher', inline: false },
                { name: '`$decrypt`', value: 'Decrypts with a given string with a specified hash/cipher', inline: false },
            ];

            return msg.reply({ embed: embed });
        }

        // About page
        if (cmd === 'about') {
            console.log('[' + new Date().toUTCString() + '] Caught "$about" cmd');
            embed.title = 'About the bot';
            embed.fields = [
                { name: 'unlucky dem0n#0001', value: 'Creator of the bot', inline: true },
                { name: '\u200b', value: '\u200b', inline: false },
                { name: 'GitHub page', value: 'https://github.com/garrettsummerfi3ld/discryptor', inline: true },
            ];

            return msg.reply({ embed: embed });
        }

        // Encrypt
        if (cmd === 'encrypt') {
            console.log('[' + new Date().toUTCString() + '] Caught "$encrypt" cmd');

            embed.title = 'Encrypt';

            if (!args.length) {
                console.log('[' + new Date().toUTCString() + '] No args found!');

                embed.description = 'Encrypt a string of text';
                embed.fields = [
                    { name: 'Error', value: 'No other arguments provided!', inline: true },
                    { name: 'Supported methods of encryption/hashing', value: '`MD5`, `AES`, `SHA1`', inline: false },
                ];

                console.log('[' + new Date().toUTCString() + '] Returning error embed');
                return msg.reply({ embed: embed });
            }

            // MD5
            if (args[0] === 'md5') {
                console.log('[' + new Date().toUTCString() + '] Caught "md5" arg');
                embed.description = 'MD5 Encryption';
                const string = args[1];

                if (string != null || string != '') {
                    console.log('[' + new Date().toUTCString() + '] "string" var is not empty or null');

                    const cipherText = crypto.MD5(string);

                    embed.color = 0x600fdb;
                    embed.fields = [
                        { name: 'Encrypted MD5 string', value: '`' + cipherText + '`', inline: true },
                    ];

                    console.log('[' + new Date().toUTCString() + '] Returning MD5 embed');

                    return msg.reply({ embed: embed });
                }

                else if (string == null || string == '') {
                    console.log('[' + new Date().toUTCString() + '] "string" var is empty or null');

                    embed.color = 0x802019;
                    embed.fields = [
                        { name: 'Arguments', value: 'All the arguments needed for this function', inline: true },
                        { name: '`md5 [message]`', value: 'Hash message using MD5', inline: true },
                    ];

                    console.log('[' + new Date().toUTCString() + '] Returning error embed to user');

                    return msg.reply({ embed: embed });
                }
            }

            // AES
            if (args[0] === 'aes') {
                console.log('[' + new Date().toUTCString() + '] Caught "aes" arg');

                embed.description = 'AES Encryption';

                const string = args[1];
                const pass = args[2];

                if (string != null || string != '' || pass != null || pass != '') {
                    console.log('[' + new Date().toUTCString() + '] "string" var is not empty or null');

                    const cipherText = crypto.AES.encrypt(string, pass);

                    embed.color = 0x600fbd;
                    embed.fields = [
                        { name: 'Encrypted AES string', value: '`' + cipherText + '`', inline: true },
                    ];

                    console.log('[' + new Date().toUTCString() + '] Returning AES embed');

                    return msg.reply({ embed: embed });
                }

                else if (string == null || string == '' || pass == null || pass == '') {
                    console.log('[' + new Date().toUTCString() + '] "string" var is empty or null');

                    embed.color = 0x802019;
                    embed.fields = [
                        { name: 'Error', value: 'No string to encrypt provided!', inline: true },
                    ];

                    console.log('[' + new Date().toUTCString() + '] Returning error embed to user');

                    return msg.reply({ embed: embed });
                }
            }

            // SHA1
            if (args[0] === 'sha1') {
                console.log('[' + new Date().toUTCString() + '] Caught "sha1" arg');

                embed.description = 'SHA1 Encryption';

                const string = args[1];

                if (string != null || string != '') {
                    console.log('[' + new Date().toUTCString() + '] "string" var is not empty or null');
                    const cipherText = crypto.SHA1(string);

                    embed.color = 0x600fbd;
                    embed.fields = [
                        { name: 'Encrypted SHA1 string', value: '`' + cipherText + '`', inline: true },
                    ];

                    console.log('[' + new Date().toUTCString() + '] Returning SHA1 embed');

                    return msg.reply({ embed: embed });
                }

                else if (string == null || string == '') {
                    console.log('[' + new Date().toUTCString() + '] "string" var is empty or null');

                    embed.color = 0x802019;
                    embed.fields = [
                        { name: 'Arguments', value: 'All the arguments needed for this function', inline: true },
                        { name: '`sha1 [message]`', value: 'Hash message using SHA1', inline: true },
                    ];

                    console.log('[' + new Date().toUTCString() + '] Returning error embed to user');

                    return msg.reply({ embed: embed });
                }
            }
        }

        // Decrypt
        if (cmd === 'decrypt') {
            console.log('[' + new Date().toUTCString() + '] Caught "$decrypt" cmd');

            embed.title = 'Decrypt';

            if (!args.length) {
                embed.color = 0x802019;
                embed.fields = [
                    { name: 'Arguments', value: 'No other arguments provided!', inline: true },
                ];

                console.log('[' + new Date().toUTCString() + '] Returning error embed to user');

                return msg.reply({ embed: embed });
            }
        }
    }
    catch (e) {
        console.error('[' + new Date().toUTCString() + '] UNKNOWN ERROR, PRINTING STACKTRACE');
        console.error('[' + new Date().toUTCString() + '] REPORT THIS TO GITHUB REPO: https://github.com/garrettsummerfi3ld/discryptor/issues');
        console.error(e);
    }
});
