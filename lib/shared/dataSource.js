const mongoose = require('mongoose');
const config = require('config');
const message = require('../shared/messagePool');
const log = require('log4js').getLogger('application');

DB_URL = config.get('MONGODB_URL');

mongoose.connect(DB_URL, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true
}).then(() => log.info(message.get("APP_TO_DB_CONNECTION"))).catch((err) => log.error(err));

mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Slot: require('../slots/slot.model')
};
