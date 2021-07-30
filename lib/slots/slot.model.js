const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
    isReserved: { type: Boolean, required: true, default: false },
    isBooked: { type: Boolean, required: true, default: false },
    slotNumber: { type: Number, unique: true, required: true },
    parkedVehNumber: { type: String },
    waitingTimeInMin: { type: Number, required: true, default: 30 },
    parkedTime: { type: Date, default: null },  // Not used in current implementation, for future reference
    createdDate: { type: Date, default: Date.now }
});

SlotSchema.set('toJSON', { virtuals: true });
const Slot = mongoose.model('Slot', SlotSchema);

module.exports = Slot;
