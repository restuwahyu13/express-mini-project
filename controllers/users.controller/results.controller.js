const User = require('../../models/Users.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class ResultsUserController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.msg = new CustomeMessage(res);
    }
    async Controler() {

        const { req, res, msg } = this;
        await User.find().select('name username email gender handphone create_at').lean(true).then(result => {

            if (!result) {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.originalUrl,
                        message: `Oops..data not found in database or deleted`
                    }
                });

            } else {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: `Yeah..data already to use`,
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
                    message: `Internal server error ${err}`,
                }
            });
        });
    }
}

module.exports = { ResultsUserController };