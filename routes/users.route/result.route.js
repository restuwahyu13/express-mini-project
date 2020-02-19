const express = require('express');
const router = express.Router();
const { ResultUserController } = require('../../controllers/users.controller/result.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.get('/user/result/:id', AuthToken, AuthRole, (req, res) => {

    return new ResultUserController(req, res).Controler();
});

module.exports = router;