const net = require('net');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('./' + configName);

class ByondTopic {
   constructor(port, host) {
      this.socket = new net.Socket();
      this.port = port || config.byondTopic.port;
      this.host = host || config.byondTopic.host;
      this.init();
   }

   init() {
      let client = this;
      client.socket.connect(client.port, client.host, () => {
         //console.log(`Client connected to: ${client.host}:${client.port}`);
      });

      client.socket.on('close', () => {
         //console.log(`Client closed`);
      });
   }

   sendTopic(T) {
      let client = this;
      return new Promise((resolve, reject) => {
         client.socket.write(client.buildMessageBuffer(T));

         client.socket.on('data', (data) => {
            resolve(data.toString('ascii').substr(5));
            client.socket.destroy();
         });

         client.socket.on('error', (err) => {
            reject(err.message);
         });
      });
   }

   buildMessageBuffer(T) {
      if (!T.startsWith('?')) T = '?' + T;
      let message = Buffer.from(T, 'ascii');
      let sendingBytes = Buffer.alloc(9);
      sendingBytes.writeUInt8(0x83, 1);
      sendingBytes.writeInt16BE(message.byteLength + 6, 2);
      sendingBytes = Buffer.concat([sendingBytes, message, Buffer.from([0x00])]);
      return sendingBytes;
   }
}

module.exports = ByondTopic;
