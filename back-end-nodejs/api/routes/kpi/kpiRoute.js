'use strict';
const express = require('express');
const router = express.Router();

// import kpi model and auth middleware
const checkAuth = require('../../middleware/check-auth');
const kpiModel = require('../../models/kpiModel');

router.get('/reservationsPerMonth', checkAuth, (req, res, next) => {
  kpiModel.getReservationByMonth(response => {
    res.status(201).send(response);
  });
});

router.get('/profitPerMonth', checkAuth, (req, res, next) => {
  kpiModel.getReservationsAmountPerMonth(response => {
    res.status(201).send(response);
  });
});

router.get('/roomStatus', checkAuth, (req, res, next) => {
  kpiModel.getRoomStatus(response => {
    res.status(201).send(response);
  });
});

module.exports = router;
