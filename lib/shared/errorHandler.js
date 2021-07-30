const log = require('log4js').getLogger('application');
const message = require('../shared/messagePool');

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        log.error(err);
        const statusCode = message.get("BAD_REQUEST_STATUS_CODE");
        return res.status(statusCode).json({ code: statusCode, message: err });
    }

    if (err.name === 'ValidationError') {
        log.error(err.message);
        const statusCode = message.get("BAD_REQUEST_STATUS_CODE");
        return res.status(statusCode).json({ code: statusCode, message: err.message });
    }

    log.error(err.message);
    const statusCode = message.get("INTERNAL_SERVER_ERROR");
    return res.status(statusCode).json({ code: statusCode, message: err.message });
}

module.exports = errorHandler;
