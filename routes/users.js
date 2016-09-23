var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var resposne = {
    id: new Date().getTime(),
    name: 'TestUser'
  }
  res.send(resposne);
});

module.exports = router;
