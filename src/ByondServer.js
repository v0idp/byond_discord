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

            if(map.get('command') == 'startup') {
                let startupEmbed = new Discord.MessageEmbed()
                    .setTitle('Round Startup')
                    .setTimestamp(new Date())
                    .setDescription(`Server starting up on ${map.get('name')}.\nConnect to: ${map.get('connect')}`);
                this.bot.sendEmbed(config.notifications.guild, config.notifications.channel, startupEmbed);
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
