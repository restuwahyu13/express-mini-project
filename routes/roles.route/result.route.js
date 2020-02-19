const express = require('express');
const router = express.Router();
const { ResultRolesController } = require('../../controllers/roles.controller/result.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.get('/role/result/:id', AuthToken, AuthRole, (req, res) => {

    return new ResultRolesController(req, res).Controller();
});

module.exports = router;