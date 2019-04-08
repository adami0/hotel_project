'use strict';
const express = require('express');
const router = express.Router();

// import rooms model and auth middleware
const checkAuth = require('./../../middleware/check-auth');
const roomsModel = require("./../../models/roomModel");

/**
 * Route '/rooms' must be auth
 */
router.get('/', checkAuth, (req, res, next) => {
  roomsModel.getRooms((response) => {
    res.status(201).send(response);
  });
});

/**
 * Route '/rooms/:id' must be auth
 */
router.patch('/:id', checkAuth, (req, res, next) => {
  roomsModel.updateRoomStatus((response) => {
    res.status(201).send(response.message);
  }, req.body, req.params.id);
});

module.exports = router;
