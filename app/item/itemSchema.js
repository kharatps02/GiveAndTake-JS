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
        requester: {
            type: String
        },
        min_value: {
            type: String
        },
        max_value: {
            type: String
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
            type: String
        },
        location_to_pickup: {
            type: String
        },
        condition: {
            type: String,
            enum: ["New", "Fair", "Good", "Poor"],
            default: "Good"
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