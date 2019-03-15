'use strict';
const express = require('express');
const router = express.Router();

// import rooms model and auth middleware
const checkAuth = require('../../middleware/check-auth');
const clientModel = require("../../models/clientModel");

router.get('/', checkAuth, (req, res, next) => {
  clientModel.getClients((response) => {
    res.status(201).send(response);
  });
});

router.get('/:id', checkAuth, (req, res, next) => {
  clientModel.getClientById((response) => {
    res.status(201).send(response);
  });
});

router.post('/', checkAuth, (req, res, next) => {
  clientModel.addClient((response) => {
    res.status(201).send(response);
  }, req.body);
});

router.put('/:id', checkAuth, (req, res, next) => {
  clientModel.updateClient((response) => {
    res.status(201).send(response);
  }, req.body, req.params.id);
});

router.delete('/:id', checkAuth, (req, res, next) => {
  clientModel.removeClient((response) => {
    res.status(201).send(response);
  }, req.params.id);
});

module.exports = router;
