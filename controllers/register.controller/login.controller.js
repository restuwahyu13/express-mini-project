// @ts-nocheck
const User = require('../../models/Users.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { Jwt } = require('../../libs/jwt');
class LoginController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.username = req.body.username;
        this.email = req.body.email;
        this.jwt = new Jwt();
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        let { req, res, username, email, jwt, msg } = this;

        // check if data already exist or not in database before login to homepage
        await User.find({ $or: [{ username: username }, { email: email }] }).lean(true).then(async result => {

            if (!result) {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.originalUrl,
                        message: `Oops..User Not found please register link below http://localhost:3000/register`
                    }
                });

            } else {

                // message if account is not activation

                if (result[0]['active_token'] == null) {

                    msg.error('success', 403, {

                        response: {

                            status: 'error',
                            code: 403,
                            method: req.method,
                            url: req.originalUrl,
                            message: 'Oops...account is not active, please resend token http://localhost:3000/resend'
                        }
                    });

                } else {

                    // set token jwt
                    const token = jwt.createToken({...result[0]['_id'] }, { expiresIn: '1d', algorithm: 'HS384' });

                    // get data from database, for macth token
                    const getAuthToken = await User.findOne({ email: result[0]['email'] }).lean(true);

                    // update token if id is match
                    await User.updateOne({ _id: getAuthToken._id }, { auth_token: token });

                    //  message after login success
                    msg.success('success', 200, {

                        response: {

                            status: 'succes',
                            code: res.statusCode,
                            method: req.method,
                            url: req.originalUrl,
                            message: 'Yeah...Login successfuly',
                            token: {
                                secret: token,
                                expirein: '24hours'
                            }
                        }
                    });
                }
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'error',
                    code: 500,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { LoginController };