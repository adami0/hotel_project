const crypto = require("crypto");

var secretLength = 64;

const generateTokenSecret = (length) => {
  return new Promise((resolve, reject) => {
    const len = Math.ceil(secretLength / 2);
    crypto.randomBytes(len, (err, buffer) => {
      if (err) return reject(err);
      else resolve(buffer.toString('hex').slice(0, len));
    });
  });
};

module.exports = generateTokenSecret;
