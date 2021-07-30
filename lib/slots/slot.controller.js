const express = require('express');
const _ = require('lodash');
const router = express.Router();
const message = require('../shared/messagePool');
const slotService = require('./slot.service');

function createNewSlot(req, res, next) {
    return slotService.createNewSlot(req.body)
        .then((d) => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ code: message.get("SUCCESS_STATUS_CODE"), message: message.get("slotCreatedSuccess") });
        })
        .catch(err => next(err));
}

function findAllSlots(req, res, next) {
    return slotService.findAllSlots()
        .then(slots => res.json(slots))
        .catch(err => next(err));
}

function findAllOccupiedSlots(req, res, next) {
    return slotService.findAllSlots()
        .then(slots => {
            const occupiedSlots = _.filter(slots, slot => slot.isBooked);
            res.json(occupiedSlots);
        })
        .catch(err => next(err));
}

function findSlotById(req, res, next) {
    return slotService.findSlotById(req.params.id)
        .then(slot => slot ? res.json(slot) : res.sendStatus(message.get("NOT_FOUND_STATUS_CODE")))
        .catch(err => next(err));
}

function deleteSlot(req, res, next) {
    return slotService.deleteSlot(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// Slots routes
router.post('/create', createNewSlot);
router.get('/', findAllSlots);
router.get('/occupied', findAllOccupiedSlots);
router.get('/:id', findSlotById);
router.delete('/:id', deleteSlot);

module.exports = router;
