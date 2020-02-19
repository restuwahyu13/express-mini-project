const User = require('../../models/Users.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class DeleteUserController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.user = User;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, user, msg } = this;
        await user.findById(id).lean(true).then(async result => {

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

                const doc = await user.deleteOne({ _id: id });

                if (doc.deletedCount > 0) {

                    msg.success('success', 200, {

                        response: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data sucesfully to deleted',
                    });

                } else {

                    msg.error('error', 403, {

                        response: 'error',
                        code: 403,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data failed to deleted',
                    });
                }
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: 'error',
                code: 500,
                method: req.method,
                url: req.originalUrl,
                message: `Internal server error ${err}`
            });
        });
    }
}

module.exports = { DeleteUserController };