const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CreateCreditsController } = require('../../controllers/credits.controller/create.controller');
const { CustomeMessage } = require('../../helpers/customeMessage');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.post('/credit/create', AuthToken, AuthRole, (req, res) => {

    const { subid, userid, uas, uts, final } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(subid) || v.isEmpty(userid) || v.isEmpty(uas) || v.isEmpty(uts) || v.isEmpty(final)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: res.statusCode,
                method: req.method,
                url: req.originalUrl,
                message: 'Oops..field is required'
            }
        });

    } else {

        return new CreateCreditsController(req, res).Controller();
    }

});

module.exports = router;