const User = require('../models/Users.model');
const { CustomeMessage } = require('../helpers/customeMessage');
const jwt = require('jsonwebtoken');
module.exports = async(req, res, next) => {

    // function custome message

    const msg = new CustomeMessage(res);

    // function get token from headers

    const token = req.headers.authorization.split(' ')[1];

    // function check token is valid

    if (token) {

        // check if token is match with data from database

        const checkToken = await User.findOne({ auth_token: token });

        if (!checkToken) {

            msg.error('error', 401, {

                response: {

                    status: 'error',
                    code: 401,
                    method: req.method,
                    url: req.originalUrl,
                    message: 'Oops..Unauthorized access, your token is not valid'
                }
            });

        } else {

            // function verification token from header with authorization bearer
            return jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {

                if (!decoded) {

                    // message if token not valid or expaired

                    msg.error('error', 401, {

                        response: {

                            status: 'error',
                            code: 401,
                            method: req.method,
                            url: req.originalUrl,
                            message: `Oops..Unauthorized access, please give valid token`
                        }
                    });

                } else {

                    // return next if token is valid

                    return next();
                }
            });
        }

    } else {

        // message if token not found for authorization

        msg.error('error', 404, {

            response: {

                status: 'error',
                code: 404,
                method: req.method,
                url: req.originalUrl,
                message: `Oops..Token not found please give valid token`
            }
        });
    }
}