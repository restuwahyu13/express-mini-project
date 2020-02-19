const Roles = require('../../models/Roles.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class ResultsRolesController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, msg } = this;
        await Roles.find({}).select('name permission create_at').lean(true).then(result => {

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

                msg.success('success', 200, {

                    response: {

                        status: 'succes',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Data is ready to use',
                        data: { results: result }
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

module.exports = { ResultsRolesController };