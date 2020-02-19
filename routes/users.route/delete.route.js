const express = require('express');
const router = express.Router();
const { DeleteUserController } = require('../../controllers/users.controller/delete.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.delete('/user/delete/:id', AuthToken, AuthRole, (req, res) => {

    return new DeleteUserController(req, res).Controller();
});

module.exports = router;