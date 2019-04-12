'use strict';
const express = require('express');
const router = express.Router();

// import rooms model and auth middleware
const checkAuth = require('./../../middleware/check-auth');
const roomsModel = require("./../../models/roomModel");


// post a new room
router.post('/register', (req, res) => {
  try {
    roomsModel.register(response => {
      res.status(201).send(response);
    }, req.body);
  } catch(err) {
    res.boom.badImplementation('soucis durant la création de la room');
  }
});


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
