const express = require('express');
const Discord = require('discord.js');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('./' + configName);

class ByondServer {
    constructor(port, bot) {
        this.port = port || config.byondServer.port;
        this.bot = bot;
        this.app = express();
        this.init();
    }

    init() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}));
    
        this.app.get('/', async (req, res) => {
            if (!req.query) return;
            let map = this.parseData(req.query);
            let command = map.get('command');

            if (command == 'startup') {
                let startupEmbed = new Discord.MessageEmbed()
                    .setTitle('Server Startup')
                    .setTimestamp(new Date())
                    .setColor(3447003)
                    .setDescription(`Server starting up on ${map.get('name')}.\nConnect to: ${map.get('connect')}`);
                this.bot.sendEmbed(config.notifications.guild, config.notifications.channel, startupEmbed);
                this.bot.sendMessage(config.notifications.guild, config.notifications.channel, `<@&${config.notifications.role}>`);
                setTimeout(() => {
                    this.bot.removeRole(config.notifications.guild, config.notifications.role);
                }, 5000);
            }
            else if (command == 'roundend') {
                let roundendEmbed = new Discord.MessageEmbed()
                    .setTitle('Round End')
                    .setTimestamp(new Date())
                    .setColor(3447003)
                    .setDescription(`The Round has ended. Server will reboot now...`);
                this.bot.sendEmbed(config.notifications.guild, config.notifications.channel, roundendEmbed);
            }
        });
    
        this.app.listen(config.byondServer.port);
        console.log(`Listening for Byond world.Export() calls on port ${config.byondServer.port}`);
    }

    parseData(query) {
        let map = new Map();
        Object.keys(query).forEach(function(key) {
            var value = query[key];
            map.set(key, value);
        });
        return map;
    }

    buildEmbed(title, map) {
        let statusEmbed = new Discord.MessageEmbed()
        .setTitle(title)
        .setTimestamp(new Date());
        map.forEach((value, name) => {
            if (name != 'command')
                statusEmbed.addField(name, value, true);
        });
        return statusEmbed;
    }
}

module.exports = ByondServer;
