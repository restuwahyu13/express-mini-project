const express = require('express');
const router = express.Router();
const { ResultsSubjectController } = require('../../controllers/subjects.controller/results.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.get('/subject/results', AuthToken, AuthRole, (req, res) => {

    return new ResultsSubjectController(req, res).Controller();
});

module.exports = router;