const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CustomeMessage } = require('../../helpers/customeMessage');
const { RefeshToken } = require('../../controllers/register.controller/resend.controller');
router.get('/resendtoken', (req, res) => {

    const { email } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(email)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: 200,
                method: req.method,
                message: 'Oops..field is required'
            }
        });

    } else {

        return new RefeshToken(req, res).Controller();
    }

});

module.exports = router;