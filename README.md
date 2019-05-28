# Byond Discord Bot

Discord Bot which can communicate with Byond Game Servers and trigger the world/Topic() proc to execute server side code and retrieve information back from the server.

## Requirements

* [NodeJS 9.x +](https://nodejs.org/en/download/)

## Installation & Configuration

Before starting your bot you will need to invite it to your server first. I recommend using this for beginners: https://discordapi.com/permissions.html
Your bot will need following permissions:

* Read Messages
* Embed Links
* Read Message History
* Send Messages
* Attach Files
* Mention @everyone

It's a bit more than the bot actually needs but if anything new is beeing added to the bot, it will already have the permissions to do it.
Enter your bot client ID into the field down below in the Permission Calculator. You can get it from your bot application site where you created your bot.
Next click on the link at the bottom and invite the bot to your server.

To configure the bot open the ``config.json`` file in the ``src`` folder and enter your bot ``token``, ``globalCommandPrefix`` and ``ownerID``. The ``byondTopic`` ``host`` settings have to be the address or domain of your byond game server, ``port`` is the port of your byond game server. the ``notifications`` settings contains ``role`` ID is to ping the user when he signed up to be notified for server startup. The last one ``byondImport`` is the settings for the webserver which listens to commands and messages from the byond game server, you can enable or disable it here and set the ``port`` it listens to.

Go into the Byond Discord root folder and type
```sh
npm prestart
```

To start the bot just simply type
```sh
npm start
```

## Contributing

1. Fork it (<https://github.com/v0idp/byond_discord/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
