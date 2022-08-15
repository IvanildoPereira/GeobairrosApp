const express = require('express')
const router = express.Router();
const addressController = require('../controllers/addressController');
const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-Upload')

// get Address
router.get('/', checkAuth, addressController.getAddresses);

// get Addresses
router.get('/:addressId', checkAuth, addressController.getAddress);



// create Address
router.post('/create', checkAuth, fileUpload.single('fachada_img'), addressController.createAddress);

// get Addresses
router.post('/update/:addressId', checkAuth, fileUpload.single('fachada_img'), addressController.updateAddress);

// delete Address
router.delete('/delete/:addressId', checkAuth, addressController.deleteAddress);


module.exports = router;