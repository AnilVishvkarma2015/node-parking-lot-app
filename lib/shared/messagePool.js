const messagePool = new Map();

function getReservedSlots(wholeValue, percentage) {
    return (percentage * wholeValue) / 100;
}

messagePool.set('userAlreadyRegistered', "User already registered with this Email.");
messagePool.set('userRegisteredSuccess', "User is registered successfully");
messagePool.set('APP_TO_DB_CONNECTION', "Application connected to MongoDB Successfully.");
messagePool.set('APP_STARTED', "Application Server is running on port:");
messagePool.set('slotNumberAlreadyExist', "This Slot Number already created.");
messagePool.set('slotCreatedSuccess', "New Slot created successfully");
messagePool.set('slotNotAvailable', "Sorry ! Slot is not available");
messagePool.set('slotBookedSuccessfully', "Parking slot booked successfully with slot number ");
messagePool.set('slotBookingFailed', "Slot booking failed. Try again after some time.");
messagePool.set('slotAlreadyBooked', "You already have one booked parking slot!");
messagePool.set('SUCCESS_STATUS_CODE', 200);
messagePool.set('BAD_REQUEST_STATUS_CODE', 400);
messagePool.set('NOT_FOUND_STATUS_CODE', 404);
messagePool.set('INTERNAL_SERVER_ERROR', 500);
messagePool.set('MAX_SLOT_SIZE', 120);
messagePool.set('REDUCED_WAITING_TIME', 15);
messagePool.set('FULL_WAITING_TIME', 30);
messagePool.set('MAX_RESERVED_SLOT_SIZE', getReservedSlots(messagePool.get('MAX_SLOT_SIZE'), 20));

module.exports = messagePool;
