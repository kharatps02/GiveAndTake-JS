var User = require('./userSchema').User;
var userModule = (function () {
    function signIn(req, res) {
        console.log(req.body)
        var email = req.body.email;
        var password = req.body.password;
        console.log("User email = " + email + ", password is " + password);

        User.findOne({
            email: email,
            password: password
        }, function (error, user) {
            var jsonObj = {};
            console.log(user);
            if (!error) {
                if (user) {
                    jsonObj = {
                        status: 'SUCCESS',
                        message: 'User logged Successfully.',
                        user: user
                    }
                } else {
                    jsonObj = {
                        status: 'ERROR',
                        message: 'Invalid data'
                    }
                }
            } else {
                jsonObj = {
                    status: 'ERROR',
                    message: 'Internal Server error'
                }
            }
            res.send(jsonObj);
        })
    };

    function signUp(req, res) {
        var reqBody = req.body;
        console.log(req.body);
        var UserObj = new User({
            username: reqBody.username,
            email: reqBody.email,
            password: reqBody.password,
            address: reqBody.address || '',
            city: reqBody.city || '',
            state: reqBody.state || '',
            mobile: reqBody.mobile || ''
        });

        var jsonObj = {};
        User.findOne({
            email: reqBody.email,
            password: reqBody.password
        }, function (error, user) {
            if (!user) {

                UserObj.save(function (error, user1) {
                    console.log(error);
                    console.log(user1);

                    if (!error) {
                        jsonObj = {
                            status: 'SUCCESS',
                            message: 'User register Successfully.',
                            user: user1
                        }
                    } else {
                        jsonObj = {
                            status: 'ERROR',
                            message: 'Internal Server error'
                        }
                    }
                    res.send(jsonObj);
                });
            } else {
                jsonObj = {
                    status: 'ERROR',
                    message: "Email Id " + UserObj.email + " alredy exits"
                }
                res.send(jsonObj);
            }

        });
    };

    function getList(req, res) {

        var jsonObj = {};
        var reqBody = req.body;
        Cafe.find({
            user_ref_id: reqBody.userId
        }, function (error, result) {
            if (!error) {
                jsonObj = {
                    status: 'SUCCESS',
                    cafeList: result
                }
            } else {
                jsonObj = {
                    status: 'ERROR',
                    message: 'Internal Server error'
                }
            }
            res.send(jsonObj);
        });

    }
    return {
        signIn: signIn,
        signUp: signUp
    };
})();

module.exports = userModule;