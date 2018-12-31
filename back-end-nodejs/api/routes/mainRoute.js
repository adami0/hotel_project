'use strict';
const express = require('express');
const app = express();

const userRoutes = require('./user/userRoute');

app.use('/user', userRoutes);

app.use('*', (req, res) => {
  res.boom.notFound(); // Responds with a 404 status code
});

module.exports = app;
