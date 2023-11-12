const WS = require('ws');
const messages = require('./message-service').messages;
const searchFexedMessage = require('./message-service').searchFexedMessage;

module.exports.webSocket = null;

module.exports.createWebSocket = (server) => {
    this.webSocket = new WS.Server({
        server
    });

    this.webSocket.on('connection', (ws) => {
        const sentMessagesArray = messages.length > 10 ? messages.slice(-10) : messages
        this.sendData({status:'connectionWs', response: sentMessagesArray}); 
        const isFixedMessageExists = searchFexedMessage();
        if (isFixedMessageExists !== -1) {
            this.sendData({ status:'toFixMessage', response: [messages[isFixedMessageExists]] })
        }    
    });

    return this.webSocket;
}

module.exports.sendData = (response) => {
    const eventData = JSON.stringify(response);

    Array.from(this.webSocket.clients)
        .filter(client => client.readyState === WS.OPEN)
        .forEach(client => client.send(eventData));
}