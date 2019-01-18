'use strict';
const jwt = require('jsonwebtoken');

// create middleware and export them
module.exports = (req, res, next) => {

    // decode token created for users
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
      return res.boom.forbidden('invalid token');
    }
};
