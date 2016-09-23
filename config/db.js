var mongoose = require('mongoose');
var dbpath = 'mongodb://X24CV2016:X24CV2016@ds035766.mlab.com:35766/giveandtake';
console.log('dbpath:' + dbpath);
(function () {
    var db = mongoose.connection;
    mongoose.connect(dbpath);

    db.on('open', function () {
        console.log('connect mongodb :' + dbpath);
    });

    db.on('error', function (err) {
        console.log('error mongodb');
        console.log(err);
    });
})();

