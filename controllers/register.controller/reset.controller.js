const User = require('../../models/Users.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { EncryptPassword } = require('../../libs/bcrypt');
class ResetController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.password = req.body.password;
        this.encrypt = EncryptPassword;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        // get data from body
        const { req, res, password, encrypt, msg } = this;

        // get token from headers with bearer
        const getToken = req.headers.authorization;

        // get token from headers and replace bearer text
        const setToken = getToken.substring(7, 300);

        // check if token auth from header match with in token auth from database
        await User.findOne({ auth_token: setToken }).then(result => {

            if (!result) {

                msg.error('error', 401, {

                    response: {

                        status: 'error',
                        code: 401,
                        method: res.method,
                        url: req.originalUrl,
                        message: `Opps...token authorization don't match`
                    }
                });

            } else {

                // function for hash password before reset password
                const hashPass = encrypt.hashPassword(password, 10);

                // function update password user after reset password
                return User.updateOne({ _id: result._id }, { password: hashPass });
            }
        }).then(doc => {

            if (doc.ok > 0) {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: res.method,
                        url: req.originalUrl,
                        message: `Yeah...reset password successfuly`
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 403,
                        method: res.method,
                        url: req.originalUrl,
                        message: `Oops...reset password failed`
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'error',
                    code: 500,
                    method: res.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { ResetController };