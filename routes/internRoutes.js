// routes/internRoutes.js
const express = require('express');
const router = express.Router();
const internController = require('../controllers/internControllers');

router.post('/register', internController.registerIntern);
router.post('/login', internController.loginIntern);

module.exports = router;
