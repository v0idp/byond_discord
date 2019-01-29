const commando = require('discord.js-commando');

responses = ['Yes','Too bad','Will you turn me off if I tell you?','Absolutely',
			"Not at all", "Nope", "It does", "No", "All the time",
			"I don't really know", "Could be","Possibly","You're still here?",
			"No idea", "Of course", "Would you turn me off if I tell you?",
			"Sweet!","Nah","Certainly","Yeah","Yup","I am quite confident that the answer is Yes",
			"Perhaps", "Yeeeeaah... No.", "Indubitably" ]

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
		return msg.reply(responses[Math.floor(Math.random() * responses.length - 1)]);
	}
};