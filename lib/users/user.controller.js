const express = require('express');
const router = express.Router();
const message = require('../shared/messagePool');
const userService = require('./user.service');

function registerUser(req, res, next) {
    return userService.createUser(req.body)
        .then(() => {
            res.setHeader('Content-Type', 'application/json');
            res.send({ code: message.get("SUCCESS_STATUS_CODE"), message: message.get("userRegisteredSuccess") });
        })
        .catch(err => next(err));
}

function findAllUsers(req, res, next) {
    return userService.findAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function findUserById(req, res, next) {
    return userService.findUserById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(message.get("NOT_FOUND_STATUS_CODE")))
        .catch(err => next(err));
}

function deleteUser(req, res, next) {
    return userService.deleteUser(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

// Users routes
router.post('/register', registerUser);
router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.delete('/:id', deleteUser);

module.exports = router;
