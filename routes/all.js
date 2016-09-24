var express = require('express');
var router = express.Router();

var userModule = require('../app/user/userModule');
var itemModule = require('../app/item/itemModule');

/* users listing. */
router.get('/users', userModule.getUsers);
router.post('/users/signin', userModule.signIn);
router.post('/users/signup', userModule.signUp);

router.post('/users/registerDevice', userModule.registerDevice);

/* prdocut listing. */
router.post('/items', itemModule.getItems);
router.post('/item', itemModule.addItem);

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
