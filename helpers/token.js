const crypto = require('crypto');
class TokenSecret {

    // function for generate automatic token for activation login
    static secretToken() {

        return crypto.randomBytes(35).toString('hex');
    }
}

module.exports = { TokenSecret };