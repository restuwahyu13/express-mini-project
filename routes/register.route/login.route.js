// @ts-nocheck
const express = require('express');
const router = express.Router();
const User = require('../../models/Users.model');
const v = require('validator').default;
const { LoginController } = require('../../controllers/register.controller/login.controller');
const { CustomeMessage } = require('../../helpers/customeMessage');
const { EncryptPassword } = require('../../libs/bcrypt');
router.post('/login', async(req, res) => {

    const { username, email, password } = req.body;

    const msg = new CustomeMessage(res);

    const userCheck = await User.find({ $or: [{ username: username }, { email: email }] });

    if (!userCheck[0]) {

        msg.error('error', 404, {

            response: {

                status: 'error',
                code: res.statusCode,
                method: req.method,
                url: req.originalUrl,
                message: 'Oops...account is not defined, please register http://localhost:3000/register'
            }
        });

    } else {
        await EncryptPassword.verifyPassword(password, userCheck[0]['password'], (err, success) => {

            if (success) {

                return new LoginController(req, res).Controller();

            } else {

                msg.error('success', 403, {

                    status: 'error',
                    code: 403,
                    method: req.method,
                    url: req.originalUrl,
                    message: `Oops..username or password wrong`
                });
            }
        });
    }
});

module.exports = router;