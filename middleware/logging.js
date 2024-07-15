const { v4: uuidv4 } = require('uuid');
const {format} = require('date-fns');
const path = require('path')
const fs = require('fs');
const fsPromises = require('fs').promises;


// Allows logging server events in a file
const loggingEvent = async (msg, fileName) => {
    const date = format(new Date(), 'yyyy-MM-dd,HH:mm:ss');
    const event = `${date},${uuidv4()},${msg}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', fileName), event);
    } catch {
        console.log(err);
    };
};


// Logger function to log requests
const logger =  (req,res, next) => {
    if(req.method ==='POST' || req.method === 'DELETE'){
        loggingEvent(`${req.body},${req.method},${req.url},${req.headers.origin}`, 'requests.log');
    }
    next();
};

module.exports = {loggingEvent, logger};