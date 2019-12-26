const express = require('express');
var multer   =  require( 'multer' );
var upload   =  multer( { dest: 'public/uploads/' } );
const router = express.Router();
const auth = require('./auth');
/**
 * Module dependencies.
 */

const dashboard = require('../app/controllers/dashboard');
const home = require('../app/controllers/home');
const property = require('../app/controllers/property');

//POST new user route (optional, everyone has access)
router.post('/signup', auth.optional, home.signup_post);
router.get('/signup', home.signup);

//POST login route (optional, everyone has access)
router.post('/signin', auth.optional, home.signin_post);
router.get('/signin', home.signin);

router.post('/logout', auth.checkToken, home.logout);

//  Password Reset
router.get('/password_reset', home.password_reset);
router.get('/password_recovery/*', home.password_recovery);

router.post('/password_reset_generate', home.password_reset_generate);
router.post('/password_reset_post', home.password_reset_post);

router.get('/settings', auth.checkToken, home.settings);
router.post('/settings/update', home.update_settings);
router.post('/settings/password', home.update_password);

//GET current route (required, only authenticated users have access)
router.use('/current', auth.required, home.current);

/**
 * Dashboard
 */

router.get('/', auth.checkToken, dashboard.index);

/**
 * Property
 */

router.get('/property/my', auth.checkToken, property.my);
router.use('/property/overview/:id', auth.checkToken, property.overview);
router.use('/property/detail/:id', auth.checkToken, property.detail);
router.use('/property/new', auth.checkToken, property.new);
router.use('/property/review', auth.checkToken, property.review);
router.use('/property/search/:query', auth.checkToken,  property.search);
router.use('/property/create', auth.checkToken, property.create);
router.use('/property/update', auth.checkToken, property.update);
router.use('/property/remove', auth.checkToken, property.remove);

// Add Tenancy
router.get('/property/documents', auth.checkToken, property.documents);
router.post('/property/documents/upload', upload.single( 'file' ), property.documents_upload);
router.get('/property/tenancies', auth.checkToken, property.tenancies);
router.use('/property/unit/new', auth.checkToken, property.new_unit);
router.use('/property/unit/delete', auth.checkToken, property.delete_unit);
router.use('/property/unit/clear', auth.checkToken, property.clear_unit);
router.use('/property/ajust_summary', auth.checkToken, property.adjust_summary);
router.use('/property/estimated_sale', auth.checkToken, property.estimated_sale);

module.exports = router;
