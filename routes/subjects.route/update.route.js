const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { UpdateSubjectController } = require('../../controllers/subjects.controller/update.controller');
const { CustomeMessage } = require('../../helpers/customeMessage');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.put('/subject/update/:id', AuthToken, AuthRole, (req, res) => {

    const { credid, lecid, name, code, sem, sks } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(credid) || v.isEmpty(lecid) || v.isEmpty(name) || v.isEmpty(code) || v.isEmpty(sem) || v.isEmpty(sks)) {

        msg.success('success', 200, {

            response: {

                status: 'success',
                code: res.statusCode,
                method: req.method,
                url: req.originalUrl,
                message: 'Oops..fields is required',
            }
        });

    } else {

        return new UpdateSubjectController(req, res).Controller();
    }
});

module.exports = router;