const express = require('express');
const router = express.Router();
const { DeleteSubjectController } = require('../../controllers/subjects.controller/delete.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.delete('/subject/delete/:id', AuthToken, AuthRole, (req, res) => {

    return new DeleteSubjectController(req, res).Controller();
});

module.exports = router;