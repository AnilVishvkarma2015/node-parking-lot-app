const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const log = require('log4js').getLogger('application');
const errorHandler = require('./lib/shared/errorHandler');
const logging = require('./lib/logging');
const message = require('./lib/shared/messagePool');
const app = express();

logging.initialize();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/users', require('./lib/users/user.controller'));
app.use('/slots', require('./lib/slots/slot.controller'));
app.use('/booking', require('./lib/booking/booking.controller'));
app.use(errorHandler);

const port = process.env.PORT || config.get('port');
app.listen(port, () => {
    log.info(message.get("APP_STARTED") + port);
});
