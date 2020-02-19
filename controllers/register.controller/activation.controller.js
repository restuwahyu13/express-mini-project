// @ts-nocheck
const User = require('../../models/Users.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class ActivationController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.email = req.query.email;
        this.token = req.query.token;
        this.active_token = new Date;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, email, token, active_token, msg } = this;

        // check if data already exist or not in database before active_token
        await User.findOne({ email: email }).then(result => {

            if (!result) {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data not found in database or deleted',
                    }
                });

            } else {

                // check token hash been active or not
                if (result.token === null || result.token !== token) {

                    msg.error('error', 401, {

                        response: {

                            status: 'error',
                            code: 401,
                            method: req.method,
                            url: req.originalUrl,
                            message: 'Oops..Token activation expired, please send new token',
                        }
                    });

                } else {

                    // update token in database after activation token successfully
                    return User.updateOne({ _id: result._id }, { active_token: active_token });
                }
            }
        }).then(doc => {

            if (doc.ok > 0) {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..your account is active, please login http://localhost:3000/login',
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 403,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..your account is not active',
                    }
                });
            }
        }).catch(err => {

            msg.success('error', 500, {

                response: {

                    status: 'error',
                    code: 500,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`,
                }
            });
        });
    }
}

module.exports = { ActivationController };