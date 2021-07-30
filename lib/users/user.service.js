const config = require('config');
const log = require('log4js').getLogger('application');
const message = require('../shared/messagePool');
const User = require('../shared/dataSource').User;

async function createUser(userParams) {
    try {
        if (await User.findOne({ email: userParams.email })) {
            throw new Error(`${message.get("userAlreadyRegistered")} : ${userParams.email}`);
        }

        const user = new User(userParams);
        return await user.save();
    } catch (err) {
        throw new Error(message.get("userAlreadyRegistered"));
    }
}

async function findAllUsers() {
    return await User.find();
}

async function findUserById(id) {
    return await User.findById(id);
}

async function deleteUser(id) {
    return await User.findByIdAndRemove(id);
}

module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    deleteUser
};
