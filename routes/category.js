const express = require('express');
const router = express.Router();

const { create, categoryById, read,list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);



router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
