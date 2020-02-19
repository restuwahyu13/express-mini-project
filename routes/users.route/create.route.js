const express = require('express');
const router = express.Router();
const { CreateUserController } = require('../../controllers/users.controller/create.controller');
const { CustomeMessage } = require('../../helpers/customeMessage');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.post('/user/create', AuthToken, AuthRole, (req, res) => {

    const msg = new CustomeMessage(res);
    const { name, username, email, gender, phone, password, cpassword } = req.body;
    const usernameRegex = /['`~!@#$%^&*()_+={}[];,<>']/gi;
    const emailRegex = /^['`~!#$%^&*()_+={}[];,<>']/gi;

    if (name === '' || username === '' || email === '' || gender === '' || phone === '' ||
        password === '' || cpassword === '') {

        return msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: 'Oops..Field is required'
        });

    } else if (usernameRegex.exec(username.match(usernameRegex))) {

        return msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: `Oops..username ${username} is not valid your using ilegal caracter`
        });

    } else if (emailRegex.exec(email.match(emailRegex))) {

        return msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: `Oops..email ${email} is not valid your using ilegal caracter`
        });

        // else if (email.endsWith('@gmail.com') === false) {

        //     return msg.success('success', 200, {

        //         code: res.statusCode,
        //         method: req.method,
        //         url: req.originalUrl,
        //         message: `Oops..email ${email} is not valid please using google mail`
        //     });

        // } else if (!cpassword.match(password) || !password.match(cpassword)) {

        return msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: 'Opps..Your password dont`n match'
        });

    } else if (password.length < 6 || cpassword.length < 6) {

        return msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: 'Opps..Password min 6 caracter'
        });

    } else {

        return new CreateUserController(req, res).Controller();
    }
});

module.exports = router;