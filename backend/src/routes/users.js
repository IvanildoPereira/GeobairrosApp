const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController');
const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-Upload')

//Register router
router.post('/register', usersController.signup);

//Login router
router.post('/login', usersController.login);

router.post('/forgot_password', usersController.forgotPassword);

router.post('/verify_token', usersController.verifyToken)

router.post('/reset_password', usersController.resetPassword);

//Get User
router.get('/', checkAuth, usersController.getUser);

router.delete('/delete/', checkAuth, usersController.deleteUser);

//Update User
router.post('/update', checkAuth, fileUpload.single('avatar_img'), usersController.updateUser);

router.post('/password/update', checkAuth, fileUpload.single('avatar_img'), usersController.updatePassword);

module.exports = router;