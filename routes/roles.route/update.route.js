const express = require('express');
const router = express.Router();
const { UpdateRolesController } = require('../../controllers/roles.controller/update.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.put('/role/update/:id', AuthToken, AuthRole, (req, res) => {

    return new UpdateRolesController(req, res).Controller();
});

module.exports = router;