const Roles = require('../../models/Roles.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class CreateRolesController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.name = req.body.name;
        this.permission = req.body.permission;
        this.create_at = new Date;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, name, permission, create_at, msg } = this;
        await Roles.findOne({ name: name, permission: permission }).then(result => {

            if (result) {

                msg.error('error', 409, {

                    response: {

                        status: 'error',
                        code: 409,
                        method: req.method,
                        message: 'Oops..data already exist in database'
                    }
                });

            } else {

                const data = new Roles({ name, permission, create_at });

                return data.save();
            }
        }).then(doc => {

            if (doc) {

                msg.success('success', 200, {

                    response: {

                        status: 'error',
                        code: res.statusCode,
                        method: req.method,
                        message: 'Yeah..data sucessfuly to store in database',
                        data: { result: doc }
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 403,
                        method: req.method,
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
                    message: `Internal server error ${err}`
                }
            });
        })
    }
}

module.exports = { CreateRolesController };