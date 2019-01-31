const express = require('express');
const Discord = require('discord.js');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('./' + configName);

class ByondImport {
    constructor(port, bot) {
        this.port = port || config.byondImport.port;
        this.bot = bot;
        this.app = express();
        this.init();
    }

    init() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}));
    
        this.app.get('/', async (req, res) => {
            let map = this.parseData(req.query);
            let command = map.get('command');

            if (map.size > 0) {
                if (command.indexOf('message') > -1) {
                    this.bot.sendMessage(map.get('channel'), map.get('message'));
                    res.json({"status": "1"});
                }
                else if (command.indexOf('startup') > -1) {
                    this.bot.sendMessage(map.get('channel'), `${map.get('message')}\n${`<@&${config.notifications.role}>`}`);
                    setTimeout(() => {
                        this.bot.removeRole(config.notifications.role);
                    }, 5000);
                    res.json({"status": "1"});
                } else {
                    res.json({"status": "0"});
                }
            } else {
                res.json({"status": "0"});
            }
        });
    
        this.app.listen(config.byondImport.port);
        console.log(`Listening for Byond world.Export() calls on port ${config.byondImport.port}`);
    }

    parseData(query) {
        let map = new Map();
        Object.keys(query).forEach(function(key) {
            var value = query[key];
            map.set(key, value);
        });
        return map;
    }
}

module.exports = ByondImport;
