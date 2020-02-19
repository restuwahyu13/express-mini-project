const Credits = require('../../models/Credits.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class DeleteCreditsController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.msg = new CustomeMessage(res);
        this.credits = Credits;
    }
    async Controller() {

        const { req, res, id, msg, credits } = this;
        await credits.findById(id).then(result => {

            if (!result) {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data not found in database or deleted'
                    }
                });

            } else {

                return credits.deleteOne({ _id: id });
            }
        }).then(doc => {

            if (doc.deletedCount > 0) {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data successfully to deleted'
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

            msg.error('error', 404, {

                response: {

                    status: 'error',
                    code: res.statusCode,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { DeleteCreditsController };