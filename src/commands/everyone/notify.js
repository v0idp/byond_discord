const commando = require('discord.js-commando');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('../../' + configName);

module.exports = class notifyCommands extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'notify',
			'memberName': 'notify',
			'group': 'everyone',
			'description': 'get notified when the next round starts',
			'examples': ['notify'],
			'guildOnly': true
		});
    }
    
    run (msg, args) {
        if (!msg.member.roles.has(config.notifications.role)) {
            msg.member.roles.add(config.notifications.role).catch(console.error);
            return msg.reply('You will be notified when the next round starts.');
        } else {
            return msg.reply('You already subscribed to get notified.');
        }
    }
};