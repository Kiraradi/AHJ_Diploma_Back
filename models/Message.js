const moment = require('moment');

class Message {
    constructor(text, geolocation, number, type = 'text', fileInfo = null) {
        this.text = text;
        this.creationTime = moment().format('DD.MM.YY HH:mm');
        this.geolocation = geolocation;
        this.number = number;
        this.type = type;
        this.fileInfo = fileInfo;
    }
}

module.exports = {
    Message
};