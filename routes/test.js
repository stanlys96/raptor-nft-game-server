const express = require('express');
const router = express.Router();
const TestController = require('../controllers/TestController');

router.get('/getAll', TestController.getTestData);
router.get('/getCurrentQueue', TestController.getCurrentQueue)
router.post('/', TestController.insertTestData);
router.post('/updateCurrentRace', TestController.updateCurrentRace);
router.get('/getCurrentRace', TestController.getCurrentRace);
router.get('/getInjuredRaptor', TestController.getInjuredRaptor);
router.get('/getFighters', TestController.getFighters);
router.get('/getFightWinner', TestController.getFightWinner);
router.get('/getTop3', TestController.getTop3);
router.get('/getQPWinner', TestController.getQPWinner);
router.get('/getCompWinner', TestController.getCompWinner);
router.get('/getDRWinner', TestController.getDRWinner);
router.get('/getRipRaptor', TestController.getRipRaptor);

module.exports = router;