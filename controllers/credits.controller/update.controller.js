const Credits = require('../../models/Credits.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class UpdateCredistController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.subject_id = req.body.subid;
        this.user_id = req.body.userid;
        this.score_uas = req.body.uas;
        this.score_uts = req.body.uts;
        this.score_final = req.body.final;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, subject_id, user_id, score_uas, score_uts, score_final, msg } = this;

        // check if data already exist or not in database before update credits
        await Credits.findById(id).lean(true).then(result => {

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

                // get data from body
                const data = { subject_id, user_id, score_uas, score_uts, score_final };

                // update data if data already exists in database
                return Credits.updateOne({ _id: id }, {...data });
            }
        }).then(doc => {

            if (doc) {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data successfuly to updated'
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'error',
                        code: 403,
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

module.exports = { UpdateCredistController };