const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const UavController = require('../controllers/UavController');

const router = express.Router();

router.use(requireAuth);

/**
 * @swagger
 * /uav:
 *  get:
 *    description: Get all user UAVs
 *    requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/models/uav'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/uav', UavController.getUavs);

/**
 * @swagger
 * /uav:
 *  post:
 *    description: Create new UAV
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/uav', UavController.create);

/**
 * @swagger
 * /uav/{id}:
 *  put:
 *    description: Update UAV
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/uav/:id', UavController.update);

/**
 * @swagger
 * /uav/{id}:
 *  delete:
 *    description: Delete UAV
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/uav/:id', UavController.delete);

module.exports = router;
