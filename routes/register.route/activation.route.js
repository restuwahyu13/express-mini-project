const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CustomeMessage } = require('../../helpers/customeMessage');
const { ActivationController } = require('../../controllers/register.controller/activation.controller');
router.get('/activation', (req, res) => {

    const { email, token } = req.query;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(email) || v.isEmpty(token)) {

        msg.error('error', 200, {

            response: {

                status: 'error',
                code: res.statusCode,
                method: req.method,
                url: req.originalUrl,
                message: 'Activation token failed, please give me token valid',
            }
        });

    } else {

        return new ActivationController(req, res).Controller();
    }
});

module.exports = router;