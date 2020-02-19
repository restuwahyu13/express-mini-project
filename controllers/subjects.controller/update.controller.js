const Subject = require('../../models/Subjects.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class UpdateSubjectController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.id = req.params.id;
        this.credits_id = req.body.credid;
        this.lecture_id = req.body.lecid;
        this.name = req.body.name;
        this.code = req.body.code;
        this.semester = req.body.sem;
        this.sks = req.body.sks;
        this.update_at = new Date;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, id, credits_id, lecture_id, name, code, semester, sks, update_at, msg } = this;
        await Subject.findById(id).lean(true).then(result => {

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

                const data = { credits_id, lecture_id, name, code, semester, sks, update_at };

                return Subject.updateOne({ _id: id }, {...data });
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

module.exports = { UpdateSubjectController };