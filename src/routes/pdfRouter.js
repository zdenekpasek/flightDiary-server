const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const PdfController = require('../controllers/PdfController');

const router = express.Router();

router.use(requireAuth);

router.get('/fetchPdf', PdfController.get);
router.post('/createPdf', PdfController.create);

module.exports = router;
