const _ = require('lodash');
const message = require('../shared/messagePool');
const slotService = require('../slots/slot.service');

function getAvailableSlots(allSlots) {
    return _.filter(allSlots, slot => !slot.isBooked) || [];
}

function getReservedSlots(availableSlots) {
    return _.filter(availableSlots, slot => slot.isReserved) || [];
}

function getWaitingTime(slotsAvailable, maxLimit) {
    const peakBookLimit = _.isNumber(maxLimit) ? (maxLimit / 2) : 0;
    return (slotsAvailable.length <= peakBookLimit) ? message.get("REDUCED_WAITING_TIME") : message.get("FULL_WAITING_TIME");
}

function sendError(code, message) {
    const err = new Error();
    err.code = code;
    err.message = message;
    throw err;
}

async function bookSlotForCandidate(availableSlots, userDetails) {
    const maxAvailableSlotSize = message.get("MAX_RESERVED_SLOT_SIZE");
    const expectedWaitingTime = getWaitingTime(availableSlots, maxAvailableSlotSize);
    const allotedParkingSlot = availableSlots.pop();

    try {
        allotedParkingSlot.isBooked = true;
        allotedParkingSlot.parkedVehNumber = userDetails.vehicleNumber;
        allotedParkingSlot.waitingTimeInMin = expectedWaitingTime;
        await slotService.updateSlot(allotedParkingSlot.id, allotedParkingSlot);
        return allotedParkingSlot;
    } catch (err) {
        return sendError(message.get("INTERNAL_SERVER_ERROR"), message.get("slotBookingFailed"));
    }
}

module.exports = {
    getAvailableSlots,
    getReservedSlots,
    getWaitingTime,
    sendError,
    bookSlotForCandidate
};
