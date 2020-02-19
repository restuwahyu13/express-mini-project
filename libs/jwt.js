const jwt = require('jsonwebtoken');
class Jwt {
    createToken(payload, options) {

        return jwt.sign(payload, process.env.SECRET_TOKEN, options);
    }
}

module.exports = { Jwt };