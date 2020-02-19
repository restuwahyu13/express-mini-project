const Roles = require('../../models/Roles.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class ResultRolesController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, msg } = this;
        await Roles.findById(id).select('name permission create_at').lean(true).then(result => {

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

                msg.success('sucess', 200, {

                    response: {

                        status: 'succes',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data already to use',
                        data: { result: result }
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

module.exports = { ResultRolesController };