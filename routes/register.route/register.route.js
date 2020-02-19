const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CustomeMessage } = require('../../helpers/customeMessage');
const { RegisterController } = require('../../controllers/register.controller/register.controller');
router.post('/register', (req, res, next) => {

    const { name, username, email, gender, phone, password, cpassword } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(name) || v.isEmpty(username) || v.isEmpty(email) || v.isEmpty(gender) ||
        v.isEmpty(phone) || v.isEmpty(password) || v.isEmpty(cpassword)) {

        msg.success('success', 200, {

            status: 'success',
            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: 'Oops..Field is required'
        });

    } else if (!v.isEmail(email)) {

        msg.success('success', 200, {

            status: 'success',
            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: `Oops..email ${email} is not valid your using ilegal caracter`
        });

    } else if (!cpassword.match(password) || !password.match(cpassword)) {

        msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: 'Opps..Your password dont`n match'
        });

    } else if (password.length < 6 || cpassword.length < 6) {

        msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: 'Opps..Password min 6 caracter'
        });

    } else {

        return new RegisterController(req, res, next).Controller();
    }
});

module.exports = router;