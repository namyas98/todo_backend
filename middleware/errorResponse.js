const {loggingEvent} = require('./logging')

//
const errorResponse = (err, req, res, next) => {
    loggingEvent(`${err.name}:${err.message},${req.method},${req.url},${req.headers.orgin}`, 'errors.log');
    
    const status = res.statusCode ? res.statusCode : 500;
    
    res.status(status);
    
    res.json({message: err.message});
}

module.exports = errorResponse;

