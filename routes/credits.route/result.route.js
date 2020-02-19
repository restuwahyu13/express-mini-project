const express = require('express');
const router = express.Router();
const { ResultCredistController } = require('../../controllers/credits.controller/result.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.get('/credit/result/:id', AuthToken, AuthRole, (req, res) => {

    return new ResultCredistController(req, res).Controller();
});

module.exports = router;