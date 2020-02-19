// @ts-nocheck
const Role = require('../models/Roles.model');
const User = require('../models/Users.model');
const { CustomeMessage } = require('../helpers/customeMessage');
module.exports = async(req, res, next) => {

    //init custome message
    const msg = new CustomeMessage(res);

    //get token from header
    const token = req.headers.authorization.split(' ')[1];

    //check data already exist or not in database
    await User.findOne({ auth_token: token }).populate('role_id', 'name permission').exec(async(err, doc) => {

        if (!doc) {

            return next();

        } else {

            // check if user permission is value is mahasiswa

            if (doc.permission === 'mahasiswa') {

                // url endpoint validation access feature

                const urlOne = req.originalUrl.replace('user', 'subject');
                const urlTwo = req.originalUrl.replace('role', 'subject');
                const urlThree = req.originalUrl.replace('credit', 'subject');

                if (req.method === 'GET' && req.originalUrl === urlOne && req.originalUrl === urlTwo &&
                    req.originalUrl === urlThree) {

                    // return next section if data is true
                    return next();

                } else {

                    // message error if user access url is not valid

                    msg.error('error', 403, {

                        response: {

                            status: 'error',
                            code: 403,
                            method: req.method,
                            message: `Oops..your canno't access this feature, your permission ${doc.permission}`
                        }
                    });
                }

            } else {

                //check roles permission in database if role premission is dosen

                const role = await Role.findOne({ permission: doc.role_id.permission });

                // check if user permission is value is dosen

                if (role.permission === 'dosen') {

                    // url endpoint validation access feature

                    const urlOne = req.originalUrl.replace('user', 'credit');
                    const urlTwo = req.originalUrl.replace('role', 'credit');

                    if (req.originalUrl === urlOne && req.originalUrl === urlTwo) {

                        // return next section if data is true

                        return next();

                    } else {

                        // message error if user access url is not valid

                        msg.error('error', 401, {

                            response: {

                                status: 'error',
                                code: 401,
                                method: req.method,
                                message: `Oops..your canno't access this feature, your permission ${doc.role_id.permission}`
                            }
                        });
                    }

                } else {

                    // return next section if data is true

                    return next();
                }
            }
        }
    });
}