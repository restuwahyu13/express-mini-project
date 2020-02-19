const express = require('express');
const router = express.Router();
const { DeleteRolesController } = require('../../controllers/roles.controller/delete.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.delete('/role/delete/:id', AuthToken, AuthRole, (req, res) => {

    return new DeleteRolesController(req, res).Controller();
});

module.exports = router;