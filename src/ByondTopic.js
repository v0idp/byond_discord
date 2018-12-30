const net = require('net');
const configName = process.env.CONFIG_NAME || 'config.json';
const config = require('./' + configName);

class ByondTopic {
   constructor(port, address) {
      this.socket = new net.Socket();
      this.port = port || config.byond.port;
      this.address = address || config.byond.address;
      this.init();
   }

   init() {
      let client = this;
      client.socket.connect(client.port, client.address, () => {
         //console.log(`Client connected to: ${client.address}:${client.port}`);
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
            reject(err);
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