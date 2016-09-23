var Item = require('./itemSchema').Item

var itemModule = (function () {

    function addItem(req, res) {
        var reqBody = req.body;

        var itemObj = new Item({
            request_type: reqBody.request_type || 'Give',
            title: reqBody.title || '',
            category: reqBody.category || '',
            requester: reqBody.requester,
            item_value: reqBody.item_value || '',
            points: reqBody.points || '',
            free_shipping: reqBody.free_shipping || '',
            shipping_cost: reqBody.shipping_cost || '',
            photo_url: reqBody.photo_url || '',
            location_to_pickup: reqBody.location_to_pickup || '',
            condition: reqBody.condition || 'Good',
            user_id: reqBody.userId
        });

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