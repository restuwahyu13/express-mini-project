// @ts-nocheck
const { TokenSecret } = require('../../helpers/token');
const { EmailTemplate } = require('../../helpers/emailTemplate');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { FileSystem } = require('../../helpers/fileSystem');
const User = require('../../models/Users.model');
let sgemail = require('@sendgrid/mail');
class RefeshToken {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.email = req.body.email;
        this.token = TokenSecret.secretToken();
        this.msg = new CustomeMessage(res);
        this.fileSystem = new FileSystem().createFile(this.email);
    }
    async Controller() {

        const { req, res, email, token, msg } = this;

        // check if email already or not in dabase
        await User.findOne({ email: email }).then(async result => {

            if (!result) {

                msg.error('error', 404, {

                    response: {

                        status: 'Error',
                        code: 404,
                        method: req.method,
                        message: 'Oops..data not found in database or deleted'
                    }
                });

            } else {

                // get data from body
                const { _id, name, email, password, create_at } = result;

                // email template
                const template = new EmailTemplate(name, email, password, create_at, token).emailTemplate();

                // sendgrind api key
                sgemail.setApiKey(process.env.SG_SECRET_KEY_API);

                // set message before sending to client
                const message = {

                    to: email,
                    from: 'admin@techgen.com',
                    subject: 'new token activation member',
                    html: template,
                }

                //sending message to client
                sgemail.send(message);

                // update token and set back null active_token
                return User.updateOne({ _id: _id }, { token: token, active_token: null });

            }
        }).then(doc => {

            if (doc.ok > 0) {

                msg.success('success', 200, {

                    response: {

                        status: 'sucess',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: `new token hash been send to ${email} please check https://mail.google.com/`,
                        token: {
                            secret: token
                        }
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 403,
                        method: req.method,
                        url: req.originalUrl,
                        message: `Oops..new token failed to send ${email}`,
                    }
                });
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

module.exports = { RefeshToken };