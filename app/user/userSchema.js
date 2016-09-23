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
        profile_img:{
            type:String
        },
        mobile: {
            type: String
        },
        address: {
            type: String
        },
        location: {
            type: Object
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        lat: {
            type: String
        },
        lng: {
            type: String
        },
        tokens: {
            type: Array
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