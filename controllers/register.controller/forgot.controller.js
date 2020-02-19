const User = require('../../models/Users.model');
const sgemail = require('@sendgrid/mail');
const { ForgotTemplate } = require('../../helpers/forgotTemplate');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { Jwt } = require('../../libs/jwt');
class ForgotController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.username = req.body.username;
        this.email = req.body.email;
        this.msg = new CustomeMessage(res);
        this.mailer = sgemail;
        this.date = new Date;
        this.jwt = new Jwt();
        this.template;

    }
    async Controller() {

        const { req, res, username, email, msg, mailer, date, jwt } = this;

        // check if data already exist or not in database before forgot password
        await User.find({ $or: [{ username: username }, { email: email }] }).then(async result => {

            if (!result[0]) {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data not found in database or deleted'
                    }
                });

            } else {

                // extract data if data already exist in database
                await result.map(async data => {

                    // create token jwt
                    const token = jwt.createToken({ _id: data._id }, { expiresIn: '1d', algorithm: 'HS384' });

                    // set template email before sending to client
                    this.template = new ForgotTemplate(data['username'], data['email'], date, token);

                    // sendgrind api key
                    mailer.setApiKey(process.env.SG_SECRET_KEY_API);

                    // set email message before sending to client
                    const message = {

                        from: 'admin@techgen.com',
                        to: result[0]['email'],
                        subject: 'Your token for reset password',
                        html: this.template.forgotTemplate(),
                    }

                    // sending message to client
                    mailer.send(message);

                    // update token auth after forgot password successfully
                    await User.updateOne({ _id: data._id }, { auth_token: token });

                    // message after forgot password successfully
                    msg.success('success', 200, {

                        response: {

                            status: 'success',
                            code: res.statusCode,
                            method: req.method,
                            message: `Yeah..new password hash been send, please check your ${data['email']}`,
                            token: { secret: token }
                        }
                    });
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'errror',
                    code: 500,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { ForgotController };