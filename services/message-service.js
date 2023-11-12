const Message = require('../models/Message').Message;
const websocketService = require('./websocket-service');

module.exports.messages = [
    {number: 0, text: 'text 1', creationTime: '21.05.23 10:54', geolocation: null, type: 'text', isFixed: false}, 
    {number: 1, text: null, creationTime: '21.05.23 10:55', geolocation: [43.585472, 39.723098], type: 'geolocation', isFixed: false},
    {number: 2, text: 'text 3', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 3, text: 'text 4', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 4, text: 'text 5', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 5, text: 'text 6', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 6, text: 'text 7', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 7, text: 'text 8', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 8, text: 'text 9', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 9, text: 'text 10', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 10, text: 'text 11', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 11, text: 'text 12', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 12, text: 'text 13', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 13, text: 'text 14', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 14, text: 'text 15', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 15, text: 'text 16', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 16, text: 'text 17', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 17, text: 'text 18', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false},
    {number: 18, text: 'text 19', creationTime: '22.05.23 10:54', geolocation: null, type: 'text', isFixed: false}
];

module.exports.send = (text, geolocation, type, fileInfo = null) => {
    const message = new Message(text, geolocation, this.messages.length, type, fileInfo);
    this.messages.push(message);
    websocketService.sendData({ status:'sendMessage', response: [message] });
}

module.exports.getMessages = (lastMessageNumber) => {
    const index = this.messages.findIndex(item => item.number == lastMessageNumber);
    const startIndex = index - 10 > 0 ? index - 10 : 0;
    return this.messages.slice(startIndex, index);
}

module.exports.toFixMessage = (fixedMessageNumber) => {
    const fixedMessageIndex = this.messages.findIndex((element) => element.number == fixedMessageNumber);
    const isFixedMessageExists = this.searchFexedMessage();
    
    if (isFixedMessageExists !== -1) {
        this.messages[isFixedMessageExists].isFixed = false;
    }
    
    if (fixedMessageIndex >= 0) {
        this.messages[fixedMessageIndex].isFixed = true;
        console.log(this.messages[fixedMessageIndex]);
        websocketService.sendData({ status:'toFixMessage', response: [this.messages[fixedMessageIndex]] })
    }
}

module.exports.searchFexedMessage = () => {
    const fixedMessageIndex = this.messages.findIndex((element) => element.isFixed);
    return fixedMessageIndex;
}


