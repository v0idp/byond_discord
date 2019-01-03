const BotClient = require('./BotClient.js');
const ByondServer = require('./ByondServer.js');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('./' + configName);

let start = function () {
  new BotClient(config.general.token).init().then((bot) => {
    new ByondServer(config.byondServer.port, bot);
  });
};

start();
