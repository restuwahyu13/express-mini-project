const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CustomeMessage } = require('../../helpers/customeMessage');
const { ResetController } = require('../../controllers/register.controller/reset.controller');
const authToken = require('../../middlewares/authToken');
router.post('/resetpassword', authToken, (req, res) => {

    const { password } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(password)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: 200,
                method: req.method,
                message: 'Oops..field is required'
            }
        });
    }

    return new ResetController(req, res).Controller();
});

module.exports = router;