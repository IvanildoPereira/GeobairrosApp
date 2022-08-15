const express = require('express')
const router = express.Router();
const followController = require('../controllers/followController');
const perfilController = require('../controllers/perfilController')
const checkAuth = require('../middleware/check-auth');


router.get('/one/:perfilId', checkAuth, perfilController.getPerfil);

router.get('/all/', checkAuth, perfilController.getPerfils);

router.post('/follow/:userFollowId', checkAuth, followController.followSystem);

module.exports = router;