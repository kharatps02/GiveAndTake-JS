var Item = require('./itemSchema').Item

var itemModule = (function () {

    function addItem(req, res) {
        var reqBody = req.body;

        var obj = {};

        if (reqBody.request_type !== undefined) {
            obj['request_type'] = reqBody.request_type;
        }
        if (reqBody.title !== undefined) {
            obj['title'] = reqBody.title;
        }
        if (reqBody.category !== undefined) {
            obj['category'] = reqBody.category;
        }
        if (reqBody.requester !== undefined) {
            obj['requester'] = reqBody.requester;
        }
        if (reqBody.item_value !== undefined) {
            obj['item_value'] = reqBody.item_value;
        }
        if (reqBody.points !== undefined) {
            obj['points'] = reqBody.points;
        }
        if (reqBody.free_shipping !== undefined) {
            obj['free_shipping'] = reqBody.free_shipping;
        }
        if (reqBody.shipping_cost !== undefined) {
            obj['shipping_cost'] = reqBody.shipping_cost;
        }
        if (reqBody.photo_url !== undefined) {
            obj['photo_url'] = reqBody.photo_url;
        }

        if (reqBody.location_to_pickup !== undefined) {
            obj['location_to_pickup'] = reqBody.location_to_pickup;
        }
        if (reqBody.condition !== undefined) {
            obj['condition'] = reqBody.condition;
        }

        if (reqBody.user_id !== undefined) {
            obj['user_id'] = reqBody.user_id;
        }

        var itemObj = new Item(obj);

        itemObj.save(function (error, item) {
            console.log(error);
            console.log(item);

            if (!error) {
                jsonObj = {
                    status: 'SUCCESS',
                    message: 'Item added Successfully.',
                    product: item
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

    function getItems(req, res) {
        var jsonObj = {};

        Item.find({
        }, function (error, result) {
            console.log(error);
            console.log(result);
            if (!error) {
                jsonObj = {
                    status: 'SUCCESS',
                    items: result
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
        addItem: addItem,
        getItems: getItems
    }

})()

module.exports = itemModule