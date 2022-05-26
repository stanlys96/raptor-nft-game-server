const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');

router.get('/getAll', TestController.getTestData);
router.get('/getCurrentQueue', TestController.getCurrentQueue)
router.post('/', TestController.insertTestData);
router.post('/updateCurrentRace', TestController.updateCurrentRace);
router.get('/getCurrentRace',TestController.getCurrentRace);

module.exports = router;