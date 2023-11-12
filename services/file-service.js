const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const FileInfo = require('../models/File').FileInfo;
const messagesService = require('../services/message-service')
    
const public = path.join(__dirname, '..', 'public');

module.exports.upload = (file) => {
    const subfolder = uuid.v4();
    const uploadFolder = `${public}/${subfolder}`;

    fs.mkdirSync(uploadFolder, { recursive: true });
    fs.copyFileSync(file.filepath, `${uploadFolder}/${file.originalFilename}`);

    const fileInfo = new FileInfo(file.originalFilename, file.mimetype, subfolder);
    messagesService.send(null, null, 'file', fileInfo);
}

module.exports.download = (path, fileName) => {
    const filePath = `${public}/${path}/${fileName}`;
  
    if (fs.existsSync(filePath)) {
        return fs.createReadStream(filePath);
    }
}
