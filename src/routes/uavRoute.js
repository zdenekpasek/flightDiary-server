const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const UavController = require('../controllers/UavController');

const router = express.Router();

router.use(requireAuth);

router.get('/uav', UavController.getUavs);
router.post('/uav', UavController.create);
router.put('/uav/:id', UavController.update);
router.delete('/uav/:id', UavController.delete);

module.exports = router;
