const express = require('express');
const router = express.Router();
const { DeleteCreditsController } = require('../../controllers/credits.controller/delete.controller');
const AuthToken = require('../../middlewares/authToken');
const AuthRole = require('../../middlewares/authRole');
router.delete('/credit/delete/:id', AuthToken, AuthRole, (req, res) => {

    return new DeleteCreditsController(req, res).Controller();
});

module.exports = router;