const User = require('../../models/Users.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { EncryptPassword } = require('../../libs/bcrypt');
class UpdateUserController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.name = req.body.name;
        this.username = req.body.username;
        this.email = req.body.email;
        this.pass = req.body.password;
        this.cpassword = req.body.cpassword;
        this.handphone = req.body.handphone;
        this.update_at = new Date;
        this.msg = new CustomeMessage(res);
        this.encrypt = EncryptPassword;
    }
    async Controller() {

        const {
            req,
            res,
            id,
            name,
            username,
            email,
            pass,
            cpassword,
            handphone,
            update_at,
            msg,
            encrypt
        } = this;

        const password = encrypt.hashPassword(pass, 10);

        const data = { name, username, email, handphone, update_at, password, cpassword };
        await User.findById(id).then(result => {

            if (!result) {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.url,
                        message: 'Oops..data not found in database or deleted'
                    }
                });

            } else {

                return User.updateOne({ _id: id }, {...data })
            }
        }).then(doc => {

            if (doc.ok > 0) {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.url,
                        message: 'Yeah..data successfully to updated'
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.url,
                        message: 'Oops..data failed to updated',
                        data: { result: {...doc } }
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'error',
                    code: 500,
                    method: req.method,
                    url: req.url,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { UpdateUserController };