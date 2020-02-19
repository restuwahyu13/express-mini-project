const Subject = require('../../models/Subjects.model');
const { CustomeMessage } = require('../../helpers/customeMessage');
class CreateSubjectController {
    constructor(req, res) {

        this.req = req;
        this.res = res;
        this.credits_id = req.body.credid;
        this.lecture_id = req.body.lecid;
        this.name = req.body.name;
        this.code = req.body.code;
        this.semester = req.body.semester;
        this.sks = req.body.sks;
        this.created_at = new Date;
        this.msg = new CustomeMessage(res);
    }
    async Controller() {

        const { req, res, credits_id, lecture_id, name, code, semester, sks, created_at, msg } = this;
        await Subject.findOne({ name: name, semester: semester }).then(result => {

            if (result) {

                msg.error('error', 409, {

                    response: {

                        status: 'error',
                        code: 409,
                        method: req.method,
                        message: 'Oops..data already exist in database'
                    }
                });

            } else {

                const data = new Subject({ credits_id, lecture_id, name, code, semester, sks, created_at });

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
                        message: 'Yeah..data successfuly to store in database'
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

module.exports = { CreateSubjectController };