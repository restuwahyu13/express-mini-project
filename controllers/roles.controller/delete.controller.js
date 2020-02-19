const Roles = require('../../models/Roles.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class DeleteRolesController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, msg } = this;
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

                return Roles.deleteOne({ _id: id });
            }
        }).then(doc => {

            if (doc.ok > 0) {

                msg.success('success', 200, {

                    response: {

                        status: 'succes',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data succesfully to deleted'
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 403,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data failed to deleted'
                    }
                });
            }
        }).catch(err => {

            res.status(500).json({

                res: {

                    code: res.statusCode,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { DeleteRolesController };