const BotClient = require('./BotClient.js');
const ByondImport = require('./ByondImport.js');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('./' + configName);

let start = function () {
  new BotClient(config.general.token).init().then((bot) => {
    if (config.byondImport.enabled) new ByondImport(config.byondImport.port, bot);
  });
};

start();
