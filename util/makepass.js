const crypto = require('crypto');
const { promisify } = require('util');

const randomBytesAsync = promisify(crypto.randomBytes);

function generateUniqueToken(length = 32) {
  return new Promise(async (resolve, reject) => {
    try {
      const buffer = await randomBytesAsync(length);
      const token = buffer.toString('base64')
        .replace(/\+/g, '-') // Replace characters not safe in URLs
        .replace(/\//g, '_')
        .replace(/=/g, '');
      resolve(token);
    } catch (err) {
      reject(new Error('Error generating token: ' + err.message));
    }
  });
}

module.exports = generateUniqueToken;