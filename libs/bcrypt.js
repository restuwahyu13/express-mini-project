const bcryptjs = require('bcryptjs');
class EncryptPassword {

    // function for hash password
    static hashPassword(password, salt) {

        return bcryptjs.hashSync(password, salt);
    }

    // function for verification password
    static verifyPassword(password, hash, callback) {
        return bcryptjs.compare(password, hash, (err, success) => {

            return callback(err, success);

        });
    }

}

module.exports = { EncryptPassword };