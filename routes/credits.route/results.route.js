const express = require('express');
const router = express.Router();
const { ResultsCredistController } = require('../../controllers/credits.controller/results.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.get('/credit/results', AuthToken, AuthRole, (req, res) => {

    return new ResultsCredistController(req, res).Controller();
});

module.exports = router;