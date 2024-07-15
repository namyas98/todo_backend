const whitelists = require('./whitelists');

const configCors = {
    origin: (origin, callback) => {
        if(whitelists.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Domain disabled by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = configCors