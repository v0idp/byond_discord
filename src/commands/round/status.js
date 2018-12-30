const Discord = require('discord.js');
const commando = require('discord.js-commando');
const ByondTopic = require('../../ByondTopic.js');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('../../' + configName);

module.exports = class statusCommands extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'status',
			'memberName': 'status',
			'group': 'round',
			'description': 'get the status of the current round',
			'examples': ['status'],
			'guildOnly': true
		});
    }
    
    run (msg, args) {
		let byond = new ByondTopic();
		byond.sendTopic('status').then((response) => {
			let responseList = new URLSearchParams(response);
			let statusEmbed = new Discord.MessageEmbed()
			.setTitle('Round Status')
			.setTimestamp(new Date());
			responseList.forEach((value, name) => {
				statusEmbed.addField(name, value, true);
			});
			return msg.embed(statusEmbed);
		}).catch((err) => {
			return console.log(err);
		});
    }
};