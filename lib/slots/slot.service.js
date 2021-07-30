const config = require('config');
const log = require('log4js').getLogger('application');
const message = require('../shared/messagePool');
const Slot = require('../shared/dataSource').Slot;

async function createNewSlot(slotDetails) {
    try {
        if (await Slot.findOne({ slotNumber: slotDetails.slotNumber })) {
            throw new Error(message.get("slotNumberAlreadyExist"));
        }

        const slot = new Slot(slotDetails);
        return await slot.save();
    } catch (err) {
        throw new Error(message.get("slotNumberAlreadyExist"));
    }
}

async function updateSlot(id, slotDetails) {
    const slot = await Slot.findById(id);

    if (!slot) throw 'slot not found';

    Object.assign(slot, slotDetails);
    await slot.save();
}

async function findAllSlots() {
    return await Slot.find();
}

async function findSlotById(id) {
    return await Slot.findById(id);
}

async function deleteSlot(id) {
    return await Slot.findByIdAndRemove(id);
}

module.exports = {
    createNewSlot,
    updateSlot,
    findAllSlots,
    findSlotById,
    deleteSlot
};
