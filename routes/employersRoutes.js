// routes/employerRoutes.js
const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employersControllers');

router.post('/register', employerController.registerEmployer);
router.post('/login', employerController.loginEmployer);

module.exports = router;
