const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');

router.get('/getAll', TestController.getTestData);
router.post('/', TestController.insertTestData);

module.exports = router;