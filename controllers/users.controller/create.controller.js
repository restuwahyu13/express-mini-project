// @ts-nocheck
const User = require('../../models/Users.model');
const moment = require('moment');
const sgemail = require('@sendgrid/mail');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { EmailTemplate } = require('../../helpers/emailTemplate');
const { TokenSecret } = require('../../helpers/token');
const { EncryptPassword } = require('../../libs/bcrypt');
const { FileSystem } = require('../../helpers/fileSystem');

class CreateUserController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.name = req.body.name;
        this.username = req.body.username;
        this.email = req.body.email;
        this.pass = req.body.password;
        this.gender = req.body.gender;
        this.handphone = req.body.handphone;
        this.create_at = new Date;
        this.role_id = req.body.role_id;
        this.token = TokenSecret.secretToken();
        this.fs = new FileSystem().createFile(this.email);
        this.msg = new CustomeMessage(res);
        this.template = new EmailTemplate(this.name, this.email,
            this.pass, this.create_at, this.token).emailTemplate();
        this.encrypt = EncryptPassword;
    }
    async Controller() {

        const {

            name,
            email,
            username,
            gender,
            pass,
            handphone,
            role_id,
            create_at,
            token,
            template,
            encrypt,
            msg,
            req,
            res

        } = this;
        await User.findOne({ username: username, email: email }).then(async result => {

            if (result) {

                msg.error('error', 409, {

                    response: {

                        status: 'error',
                        code: 409,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data already exists in database',
                        data: {

                            name: name,
                            username: username,
                            email: email,
                            gender: gender,
                            handphone: handphone
                        }
                    }
                });

            } else {

                const password = encrypt.hashPassword(pass, 10);

                const data = new User({

                    name,
                    email,
                    username,
                    gender,
                    password,
                    handphone,
                    role_id,
                    create_at,
                    token
                });

                await data.save();
            }
        }).then(doc => {

            if (doc) {

                // sendgrid secret key
                sgemail.setApiKey(process.env.SG_SECRET_KEY_API);

                //sendgrid options
                const message = {

                    to: email,
                    from: 'admin@techgen.com',
                    subject: 'Activation account member',
                    text: '',
                    html: template
                }

                //sending email to client
                sgemail.send(message);

                msg.success('success', 201, {

                    response: {

                        status: 'succes',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Data successfuly to store in database',
                        data: {

                            name: name,
                            username: username,
                            email: email,
                            password: password,
                            gender: gender,
                            handphone: handphone,
                            create_at: moment(new Date).format('DD-MM-YYYY-h:mm:ss'),
                            token: {

                                message: `check your email ${email} token hash been sending`,
                                secret: token
                            }
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
                        message: 'Oops..Data failed store to database'
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'error',
                    code: 500,
                    method: request.method,
                    url: request.originalUrl,
                    message: `Internal Server Error ${err}`
                }
            });
        });
    }
}

module.exports = { CreateUserController };