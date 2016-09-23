var mongoose = require('mongoose');

var User = (function () {
    var Schema = mongoose.Schema;

    var locationSchema = new Schema({
        address: {
            type: String,
            required: true
        },
        city: {
            type: String
        },
        state: {
            type: String
        }
    });

    var UserSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        mobile: {
            type: String
        },
        address: {
            type: String         
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    });
    var User = mongoose.model('User', UserSchema);
    return {
        User: User
    };
})();

module.exports = User;