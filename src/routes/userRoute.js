const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.use(requireAuth);

router.get('/user', UserController.getUser);
router.get('/user/stats', UserController.getStats);

module.exports = router;
