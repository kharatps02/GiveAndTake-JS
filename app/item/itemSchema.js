var mongoose = require('mongoose');

var item = (function () {
    var Schema = mongoose.Schema;
    var itemSchema = new Schema({
        request_type: {
            type: String,
            enum: ["Give", "Take", "Donate"],
            default: "Give"
        },
        title: {
            type: String
        },
        category: {
            type: String
        },
         description: {
            type: String
        },
        requester: {
            type: String
        },
        min_value: {
            type: Number
        },
        max_value: {
            type: Number
        },
        points: {
            type: String
        },
        free_shipping: {
            type: String
        },
        shipping_cost: {
            type: String
        },
        photo_url: {
            type: Array
        },
        location_to_pickup: {
            type: String
        },
        condition: {
            type: String,
            enum: ["New", "Fair", "Good", "Poor"],
            default: "Good"
        },
        status: {
            type: String
        },
        userId: {
            type: String
        }
    });


    var item = mongoose.model('Item', itemSchema);
    return {
        Item: item
    };

})();

module.exports = item;