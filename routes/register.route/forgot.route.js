const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CustomeMessage } = require('../../helpers/customeMessage');
const { ForgotController } = require('../../controllers/register.controller/forgot.controller');
router.post('/forgotpassword', (req, res) => {

    const { email } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(email)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: res.statusCode,
                method: req.method,
                message: 'Oops..field is required'
            }
        });

    } else {

        return new ForgotController(req, res).Controller();
    }

});

module.exports = router;