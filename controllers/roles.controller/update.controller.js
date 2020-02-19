const Roles = require('../../models/Roles.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class UpdateRolesController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.name = req.body.name;
        this.permission = req.body.permission;
        this.update_at = new Date;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, name, permission, update_at, msg } = this;
        await Roles.findById(id).lean(true).then(result => {

            if (!result) {

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

                const data = { name, permission, update_at }

                return Roles.updateOne({ _id: id }, {...data });
            }
        }).then(doc => {

            if (doc) {

                msg.success('success', 200, {

                    response: {

                        status: 'succes',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data successfuly to updated'
                    }
                });

            } else {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data failed to updated'
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

module.exports = { UpdateRolesController };