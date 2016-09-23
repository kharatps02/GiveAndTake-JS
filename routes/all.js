var express = require('express');
var router = express.Router();

var userModule = require('../app/user/userModule');

/* GET users listing. */
router.post('/signin', userModule.signIn);
router.post('/signup', userModule.signUp);

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
