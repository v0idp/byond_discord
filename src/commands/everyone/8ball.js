const commando = require('discord.js-commando');

responses = ["It is certain","It is decidedly so", "Without a doubt", "Yes - definitely", "As I see it, yes",
			"Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy", "Try again", "Ask again later",
			"Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no",
			"My sources say no", "Outlook not so good", "Very doubtful"]

module.exports = class eightballCommands extends commando.Command {
	constructor (client) {
		super(client, {
			'name': '8ball',
			'memberName': '8ball',
			'aliases': ['eightball'],
			'group': 'everyone',
			'description': 'ask any question to the 8ball',
			'examples': ['8ball should I play captain next round ?'],
			'guildOnly': true,
			
			'args': [
				{
					'key': 'question',
					'prompt': 'what question do you want to ask 8ball ?',
					'type': 'string'
				}
			]
		});
	}

	run (msg, args) {
		return msg.reply(responses[Math.floor(Math.random() * responses.length)]);
	}
};