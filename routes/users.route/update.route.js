const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { UpdateUserController } = require('../../controllers/users.controller/update.controller');
const { CustomeMessage } = require('../../helpers/customeMessage');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.put('/user/update/:id', AuthToken, AuthRole, (req, res) => {

    const { name, username, email, password, cpassword } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(name) || v.isEmpty(username) || v.isEmpty(email) || v.isEmpty(password) || v.isEmpty(cpassword)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: res.statusCode,
                method: req.method,
                message: 'Oops..fields is required'
            }
        });

    } else if (!v.isEmail(email)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: res.statusCode,
                method: req.method,
                message: 'Oops..email is not valid'
            }
        });

    } else if (!cpassword.match(password) || !password.match(cpassword)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: res.statusCode,
                method: req.method,
                message: 'Oops..password is not match'
            }
        });

    } else if (password.lengt < 8 || cpassword.length < 8) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: res.statusCode,
                method: req.method,
                message: 'Oops..password min 8 caracter'
            }
        });

    } else {

        return new UpdateUserController(req, res).Controller();
    }

});

module.exports = router;