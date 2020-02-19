const express = require('express');
const router = express.Router();
const v = require('validator').default;
const { CustomeMessage } = require('../../helpers/customeMessage');
const { CreateRolesController } = require('../../controllers/roles.controller/create.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.post('/role/create', AuthToken, AuthRole, (req, res, next) => {

    const { name, permission } = req.body;

    const msg = new CustomeMessage(res);

    if (v.isEmpty(name) || v.isEmpty(permission)) {

        msg.success('success', 200, {

            code: res.statusCode,
            method: req.method,
            url: req.originalUrl,
            message: 'Oops..field is required'
        });

    } else {

        // init create roles controller
        return new CreateRolesController(req, res).Controller();
    }
});

module.exports = router;