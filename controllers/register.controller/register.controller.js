// @ts-nocheck
const User = require('../../models/Users.model');
const Role = require('../../models/Roles.model');
const moment = require('moment');
const sgemail = require('@sendgrid/mail');
const { TokenSecret } = require('../../helpers/token');
const { EmailTemplate } = require('../../helpers/emailTemplate');
const { EncryptPassword } = require('../../libs/bcrypt');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { FileSystem } = require('../../helpers/fileSystem');
class RegisterController {
    constructor(req, res, next) {

        this.req = req;
        this.res = res;
        this.next = next;
        this.name = req.body.name;
        this.email = req.body.email;
        this.username = req.body.username;
        this.gender = req.body.gender;
        this.pass = req.body.password;
        this.cpass = req.body.cpassword;
        this.handphone = req.body.phone;
        this.permission = 'mahasiswa';
        this.create_at = new Date;
        this.token = TokenSecret.secretToken();
        this.template = new EmailTemplate(this.name, this.email,
            this.pass, this.create_at, this.token).emailTemplate();
        this.encrypt = EncryptPassword;
        this.msg = new CustomeMessage(res);
        this.fs = new FileSystem().createFile(this.email);
    }
    async Controller() {

        const {

            req,
            res,
            next,
            name,
            email,
            username,
            gender,
            pass,
            cpass,
            handphone,
            create_at,
            permission,
            token,
            template,
            encrypt,
            msg

        } = this;

        // check if data already or not in database before data to store in database
        await User.findOne({ email: email, username: username }).lean(true).then(async result => {

            if (result) {

                msg.error('error', 409, {

                    response: {

                        status: 'error',
                        code: 409,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data already exist in database',
                        data: {
                            name: name,
                            username: username,
                            email: email,
                        }
                    }
                });

            } else {

                // function check if permission is mahasiswa

                const role = await Role.findOne({ permission: 'mahasiswa' });

                if (role.permission === permission) {

                    // hash password
                    const password = encrypt.hashPassword(pass, 10);

                    // get data from body
                    const input = { name, username, email, gender, password, handphone, permission, token, create_at };

                    const data = new User({...input });

                    // store data to database
                    return data.save();

                } else {

                    // return next after send data if error
                    return next();
                }
            }
        }).then(doc => {

            if (doc) {

                // sendgrid api key
                sgemail.setApiKey(process.env.SG_SECRET_KEY_API);

                // set email message before sending to client
                const message = {

                    to: email,
                    from: 'admin@techgen.com',
                    subject: 'Activation account member',
                    text: '',
                    html: template
                }

                // sending email to client after store data to database
                sgemail.send(message);

                msg.success('success', 201, {

                    response: {

                        status: 'succes',
                        code: 201,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Data successfuly to store in database',
                        data: {
                            name: name,
                            username: username,
                            email: email,
                            gender: gender,
                            permission: permission,
                            handphone: handphone,
                            create_at: moment(new Date).format('DD-MM-YYYY-h:mm:ss')
                        },
                        token: {
                            message: `check your email ${email} token hash been send`,
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
                        message: 'Oops..data failed to store in database'
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
                    message: `Internal Server Error ${err}`
                }
            });

        });
    }
}

module.exports = { RegisterController };