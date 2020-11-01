const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const UavController = require('../controllers/UavController');

const router = express.Router();

router.use(requireAuth);

router.get('/uav', UavController.getUavs);
router.post('/uav', UavController.create);

module.exports = router;
