const Subject = require('../../models/Subjects.model');
const Credits = require('../../models/Credits.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class ResultsSubjectController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, msg } = this;
        await Subject.find().select('credits_id lecture_id name code semester sks').populate('lecture_id', 'name username email gender').lean(true).then(async result => {

            if (!result) {

                msg.error('error', 404, {

                    response: {

                        status: 'error',
                        code: 404,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Oops..data failed to result',
                        data: { results: result }
                    }
                });

            } else {

                const credits = await Credits.findOne({ creditsId: result[0]['credits_id'] }).select('score_uas score_uts score_final').lean(true);

                msg.success('success', 200, {

                    response: {

                        status: 'success',
                        code: res.statusCode,
                        method: req.method,
                        url: req.originalUrl,
                        message: 'Yeah..data already to use',
                        data: { results: result.concat(credits) }
                    }
                });
            }
        }).catch(err => {

            msg.error('error', 500, {

                response: {

                    status: 'success',
                    code: res.statusCode,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Internal server error ${err}`
                }
            });
        });
    }
}

module.exports = { ResultsSubjectController };