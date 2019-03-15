'use strict';
const express = require('express');
const router = express.Router();

// import rooms model and auth middleware
const checkAuth = require('../../middleware/check-auth');
const reservationModel = require("../../models/reservationModel");

router.get('/', checkAuth, (req, res, next) => {
  reservationModel.getReservations((response) => {
    res.status(201).send(response);
  });
});

router.get('/:id', checkAuth, (req, res, next) => {
  reservationModel.getReservationById((response) => {
    res.status(201).send(response);
  });
});

router.post('/', checkAuth, (req, res, next) => {
  reservationModel.addReservation((response) => {
    res.status(201).send(response);
  }, req.body);
});

router.put('/:id', checkAuth, (req, res, next) => {
  reservationModel.updateReservation((response) => {
    res.status(201).send(response);
  }, req.body, req.params.id);
});

router.delete('/:id', checkAuth, (req, res, next) => {
  reservationModel.removeReservation((response) => {
    res.status(201).send(response);
  }, req.params.id);
});

module.exports = router;
