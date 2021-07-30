const express = require('express');
const _ = require('lodash');
const router = express.Router();
const message = require('../shared/messagePool');
const bookingUtility = require('./booking.utility');
const slotService = require('../slots/slot.service');
const userService = require('../users/user.service');

async function bookSlot(req, res, next) {
    try {
        const slots = await slotService.findAllSlots();
        const availableSlots = bookingUtility.getAvailableSlots(slots);

        const userDetails = await userService.findUserById(req.params.id);
        const isUserAlreadyHaveSlot = _.find(slots, slot => (slot.parkedVehNumber === userDetails.vehicleNumber) && (slot.isBooked));

        if (isUserAlreadyHaveSlot) {
            return bookingUtility.sendError(message.get("SUCCESS_STATUS_CODE"), message.get("slotAlreadyBooked"));
        }

        if (availableSlots.length === 0) {
            return bookingUtility.sendError(message.get("SUCCESS_STATUS_CODE"), message.get("slotNotAvailable"));
        }

        const isUserReservedCategory = userDetails.isDisabled || userDetails.isPregnant || false;
        const reservedSlots = bookingUtility.getReservedSlots(availableSlots);
        const slotsAvailableForBooking = (isUserReservedCategory && reservedSlots.length > 0) ? reservedSlots : _.difference(availableSlots, reservedSlots);
        const bookedSlotPayload = await bookingUtility.bookSlotForCandidate(slotsAvailableForBooking, userDetails);
        res.send({ code: message.get("SUCCESS_STATUS_CODE"), payload: bookedSlotPayload });
    } catch (err) {
        res.send(err);
    }
}

// Booking routes
router.post('/book/:id', bookSlot);

module.exports = router;
