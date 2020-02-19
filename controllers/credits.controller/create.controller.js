const Credits = require('../../models/Credits.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class CreateCreditsController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.subject_id = req.body.subid;
        this.user_id = req.body.user_id;
        this.score_uas = req.body.score_uas;
        this.score_uts = req.body.score_uts;
        this.score_final = req.body.score_final;
        this.create_at = new Date;
        this.credits = Credits;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, subject_id, user_id, score_uas, score_uts, score_final, create_at, credits, msg } = this;
        await credits.findOne({ user_id: user_id }).then(result => {

            if (result) {

                msg.error('error', 409, {

                    response: {

                        status: 'success',
                        code: 409,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data already exist in database'
                    }
                });

            } else {

                const data = new Credits({ subject_id, user_id, score_uas, score_uts, score_final, create_at });

                return data.save();
            }
        }).then(doc => {

            if (doc) {

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data sucessfuly to store in database'
                    }
                });

            } else {

                msg.error('error', 403, {

                    response: {

                        status: 'success',
                        code: 403,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data failed to store in database'
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'success',
                    code: 500,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { CreateCreditsController };