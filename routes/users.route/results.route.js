const express = require('express');
const router = express.Router();
const { ResultsUserController } = require('../../controllers/users.controller/results.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.get('/user/results', AuthToken, AuthRole, (req, res) => {

    return new ResultsUserController(req, res).Controler();
});

module.exports = router;