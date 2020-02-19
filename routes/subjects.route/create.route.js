const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CreateSubjectController } = require('../../controllers/subjects.controller/create.controller');
const { CustomeMessage } = require('../../helpers/customeMessage');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.post('/subject/create', AuthToken, AuthRole, (req, res) => {

    const { credid, lecid, name, code, sum, sks } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(name) || v.isEmpty(code) || v.isEmpty(sum) || v.isEmpty(lecid) || v.isEmpty(sks) || v.isEmpty(credid)) {

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

        return new CreateSubjectController(req, res).Controller();
    }

});

module.exports = router;