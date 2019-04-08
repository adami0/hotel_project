'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment');

// import user model and auth middleware
const auth = require('./../../middleware/auth');
const uploader = require('./../../middleware/uploader');
const checkAuth = require('./../../middleware/check-auth');
const userModel = require('./../../models/userModel');

// post a new user
router.post('/register', (req, res) => {
  try {
    userModel.register(response => {
    res.status(201).send(response);
    }, req.body);
  } catch(err) {
    res.boom.badImplementation('soucis durant la création user');
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
        const token = jwt.sign(payload, process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), { expiresIn: '2 days', algorithm: 'RS256' }); // expires in 24 hours
        response.token = token;
        response.expires = moment(moment().add(2, 'd')).format("x");
        return res.status(201).send(response);
      } else {
        res.boom.unauthorized(response);
      }
  }, req.body); // le second param de userModel.login() est ici !!!
});

router.post('/avatar', uploader.single('avatar'), (req, res, next) => {
  console.log(req.file);
});

router.delete('/:id', checkAuth, (req, res) => {
  userModel.remove((reponse) => {
      res.send(reponse);
  }, req.params.id);
});

router.get('/', checkAuth, (req, res) => {
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
