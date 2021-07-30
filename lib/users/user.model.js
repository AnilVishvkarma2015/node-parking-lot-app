const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    gender: { type: String, required: true },
    city: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    isDisabled: { type: Boolean, required: true, default: false },
    isPregnant: { type: Boolean, required: true, default: false },
    vehicleNumber: { type: String, unique: true, required: true },
    createdDate: { type: Date, default: Date.now }
});

UserSchema.set('toJSON', { virtuals: true });
const User = mongoose.model('User', UserSchema);

module.exports = User;
