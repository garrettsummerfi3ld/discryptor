// Environment variables (bot tokens, CI, etc)
require('dotenv').config();

const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');
const crypto = require('crypto-js');
const chalk = require('chalk');
const winston = require('winston');
const moment = require('moment');
const client = new Discord.Client();


const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logs/discryptor.log',
            level: config.logLevel,
            prettyPrint: true,
        }),
    ],
    format: winston.format.printf(log => `[${moment()}] - [${log.level.toUpperCase()}] - ${log.message}`),
});

logger.info('Loading modules...');

client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

process.on('uncaughtException', error => logger.log('error', error));
try {
    if (process.env.TOKEN == '' || fs.existsSync('.env')) {
        logger.debug('Environment variable exists');
    }
}
catch (e) {
    logger.warn('UNKNOWN ERROR, PRINTING STACKTRACE');
    logger.warn('REPORT THIS TO GITHUB REPO: https://github.com/garrettsummerfi3ld/discryptor/issues');
    logger.warn(e);
}

logger.info('Loaded modules');

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
logger.info('Starting up...');
client.on('ready', async () => {
    logger.info(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: 'online',
        activity: {
            name: 'with numbers',
        },
    });
    logger.info('Done loading!');
});

client.login(process.env.TOKEN);

client.on('message', async msg => {
    try {
        if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

        const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
        const cmd = args.shift().toLowerCase();

        // Help page
        if (cmd === 'help') {
            logger.debug('Caught "$help" cmd');
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
            logger.debug('Caught "$about" cmd');
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
            logger.debug('Caught "$encrypt" cmd');
            embed.title = 'Encrypt';
            // Error string if nothing is provided
            if (!args.length) {
                logger.debug('No args found!');
                embed.description = 'Encrypt a string of text';
                embed.fields = [
                    { name: 'Error', value: 'No other arguments provided!', inline: true },
                    { name: 'Supported methods of encryption/hashing', value: '`MD5`, `AES`, `SHA1`', inline: false },
                ];
                logger.debug('Returning error embed to user');
                return msg.reply({ embed: embed });
            }

            // MD5
            if (args[0] === 'md5') {
                logger.debug('Caught "md5" arg');
                embed.description = 'MD5 Encryption';
                const string = args[1];

                // Parsing string

                if (string != null || string != '') {
                    logger.debug('"string" var is not empty or null');
                    const cipherText = crypto.MD5(string);
                    embed.color = 0x600fdb;
                    embed.fields = [
                        { name: 'Encrypted MD5 string', value: '`' + cipherText + '`', inline: true },
                    ];
                    logger.debug('Returning MD5 embed');
                    return msg.reply({ embed: embed });
                }
                // Error string if nothing is provided
                else if (string == null || string == '') {
                    logger.debug('"string" var is empty or null');
                    embed.color = 0x802019;
                    embed.fields = [
                        { name: 'Arguments', value: 'All the arguments needed for this function', inline: true },
                        { name: '`md5 [message]`', value: 'Hash message using MD5', inline: true },
                    ];
                    logger.debug('Returning error embed to user');
                    return msg.reply({ embed: embed });
                }
            }

            // AES
            if (args[0] === 'aes') {
                logger.debug('Caught "aes" arg');
                embed.description = 'AES Encryption';
                const string = args[1];
                const pass = args[2];

                // Parsing string and encrypting with password

                if (string != null || string != '' || pass != null || pass != '') {
                    logger.debug('"string" var is not empty or null');
                    const cipherText = crypto.AES.encrypt(string, pass);
                    embed.color = 0x600fbd;
                    embed.fields = [
                        { name: 'Encrypted AES string', value: '`' + cipherText + '`', inline: true },
                    ];
                    logger.debug('Returning AES embed');
                    return msg.reply({ embed: embed });
                }
                // Error string if nothing is provided
                else if (string == null || string == '' || pass == null || pass == '') {
                    logger.debug('"string" var is empty or null');
                    embed.color = 0x802019;
                    embed.fields = [
                        { name: 'Error', value: 'No string to encrypt provided!', inline: true },
                    ];
                    logger.debug('Returning error embed to user');
                    return msg.reply({ embed: embed });
                }
            }

            // SHA1
            if (args[0] === 'sha1') {
                logger.debug('Caught "sha1" arg');
                embed.description = 'SHA1 Encryption';
                const string = args[1];
                // Parsing string
                if (string != null || string != '') {
                    logger.debug('"string" var is not empty or null');
                    const cipherText = crypto.SHA1(string);
                    embed.color = 0x600fbd;
                    embed.fields = [
                        { name: 'Encrypted SHA1 string', value: '`' + cipherText + '`', inline: true },
                    ];
                    logger.debug('Returning SHA1 embed');
                    return msg.reply({ embed: embed });
                }
                // Error string if nothing is provided
                else if (string == null || string == '') {
                    logger.debug('"string" var is empty or null');
                    embed.color = 0x802019;
                    embed.fields = [
                        { name: 'Arguments', value: 'All the arguments needed for this function', inline: true },
                        { name: '`sha1 [message]`', value: 'Hash message using SHA1', inline: true },
                    ];
                    logger.debug('Returning error embed to user');
                    return msg.reply({ embed: embed });
                }
            }

            // Base64
            if (args[0] === 'base64') {
                logger.debug('Caught "sha1" arg');
                embed.description = 'Base64 Description';

                const string = args[1];

                // Parsing string
                if (string != null || string != '') {}
            }
        }

        // Decrypt
        if (cmd === 'decrypt') {
            logger.debug('Caught "$decrypt" cmd');
            embed.title = 'Decrypt';
            // Error string if nothing is provided
            logger.debug('No args found!');
            embed.description = 'Decrypting a string of text';
            embed.fields = [
                { name: 'Error', value: 'No other arguments provided!', inline: true },
                { name: 'Supported methods of decryption', value: '`MD5`, `AES`, `SHA1`', inline: false },
            ];
            logger.debug('Returning error embed to user');
            return msg.reply({ embed: embed });
        }
    }
    catch (e) {
        logger.warn('UNKNOWN ERROR, PRINTING STACKTRACE');
        logger.warn('REPORT THIS TO GITHUB REPO: https://github.com/garrettsummerfi3ld/discryptor/issues');
        logger.warn(e);
    }

});

process.on('uncaughtException', error => logger.log('error', error));
