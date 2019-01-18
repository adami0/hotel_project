'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// import user model and auth middleware
const auth = require("./../../middleware/auth");
const checkAuth = require('./../../middleware/check-auth');
const userModel = require("./../../models/userModel");

// post a new user
router.post('/register', (req, res) => {
  try {
    userModel.register(response => {
    res.status(201).send(response);
    }, req.body);
  } catch(err) {
    res.boom.badImplementation("soucis durant la création user");
  }
});

// authenticate use with credentials and respond with signed jwt token
router.post('/authenticate', (req, res) => {
  if (!req.body) {
    return res.boom.badImplementation('access non autorisé au serveur');
  }

  userModel.authenticate(response => {
      if (!response.error) {
        const payload = { user: response.user, message: response.message };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2 days' }); // expires in 24 hours
        response.token = token;
        return res.status(201).send(response);
      } else {
        res.boom.unauthorized(response);
      }
  }, req.body); // le second param de userModel.login() est ici !!!
});

router.delete('/user/:id', (req, res) => {
  userModel.remove((reponse) => {
      res.send(reponse);
  }, req.params.id);
});

router.get('/users', (req, res) => {
    userModel.getUser((response) => {
      res.status(200).send(response);
    });
});

router.get('/:id', checkAuth, (req, res) => {
  userModel.getUser((response) => {
    res.status(200).send(response);
  }, req.params.id);
});

module.exports = router;
