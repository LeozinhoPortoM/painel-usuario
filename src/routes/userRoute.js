const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/create', UserController.create);
router.get('/', UserController.index);
router.get('/:id', UserController.show);

module.exports = router;