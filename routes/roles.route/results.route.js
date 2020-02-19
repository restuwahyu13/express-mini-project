const express = require('express');
const router = express.Router();
const { ResultsRolesController } = require('../../controllers/roles.controller/results.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.get('/role/results', AuthToken, AuthRole, (req, res) => {

    return new ResultsRolesController(req, res).Controller();
});

module.exports = router;