const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const MissionController = require('../controllers/MissionController');

const router = express.Router();

router.use(requireAuth);

router.get('/mission', MissionController.getMissions);
router.post('/mission', MissionController.create);
router.put('/mission/:id', MissionController.update);

module.exports = router;
