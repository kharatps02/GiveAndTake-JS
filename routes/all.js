var express = require('express');
var router = express.Router();

var userModule = require('../app/user/userModule');

/* GET users listing. */
router.post('/users/signin', userModule.signIn);
router.post('/users/signup', userModule.signUp);
router.get('/users', userModule.getUsers);

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
