var request = require('request');

var Item = require('./itemSchema').Item

var itemModule = (function () {

    function addItem(req, res) {
        var reqBody = req.body;

        var obj = {};

        if (reqBody.request_type !== undefined) {
            obj['request_type'] = reqBody.request_type;
        } else {
            obj['request_type'] = "Give";
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
        if (reqBody.max_value !== undefined) {
            obj['max_value'] = reqBody.max_value;
        }

        if (reqBody.min_value !== undefined) {
            obj['min_value'] = reqBody.min_value;
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
        } else {
            obj['condition'] = "Good";
        }

        if (reqBody.user_id !== undefined) {
            obj['user_id'] = reqBody.user_id;
        }
        console.log('JSON-', obj);
        var itemObj = new Item(obj);

        itemObj.save(function (error, item) {
            console.log(error);
            console.log(item);

            if (!error) {
                jsonObj = {
                    status: 'SUCCESS',
                    message: 'Item added Successfully.',
                    item: item
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
        var reqBody = req.body;

        var obj = {};
        var conditions = {}, conditions1 = {}, conditions2 = {};
        var andCond = [], orCond = [], orCond1 = [];

        if (reqBody.min_value !== undefined) {
            obj['min_value'] = reqBody.min_value;
            conditions["min_value"] = {
                '$gte': obj.min_value
            }
            andCond.push({
                "min_value": {
                    '$gte': obj.min_value
                }
            });
        }

        if (reqBody.max_value !== undefined) {
            obj['max_value'] = reqBody.max_value;
            conditions["max_value"] = {
                '$lte': obj.max_value
            }
            andCond.push({
                "max_value": {
                    '$lte': obj.max_value
                }
            });
        }

        if (reqBody.userId !== undefined) {
            conditions["userId"] = {
                '$ne': reqBody.userId
            }
            andCond.push({ "userId": { $ne: reqBody.userId } });
        }

        if (reqBody.min_value !== undefined && reqBody.max_value !== undefined) {
            conditions1['$and'] = andCond;
            orCond1.push(conditions1);
        } else {
            conditions1 = conditions;
        }

        if (reqBody.take_title !== undefined) {
            orCond1.push({ title: reqBody.take_title });
            orCond1.push({ description: reqBody.take_title });

            conditions2 = {
                "$or": orCond1
            }
        } else {
            conditions2 = conditions1;
        }

        // if (reqBody.lat !== undefined) {
        //     obj['lat'] = reqBody.lat;
        // }
        // if (reqBody.lng !== undefined) {
        //     obj['lng'] = reqBody.lng;
        // }

        console.log('conditions.......', JSON.stringify(conditions2));
        Item.find(conditions2, function (error, result) {
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

    function getBotResult(req, res) {

        var reqBody = req.body;
       // console.log('In getBotResult ..')
        var url = "https://barthub-developer-edition.ap2.force.com/services/apexrest/myservice?";
        //searchKey=carrom&";
        //minVal=500&maxVal=10000";
        if (reqBody.min_value !== undefined) {
            url += "&minVal=" + reqBody.min_value;
        } else {
            url += "&minVal=0";
        }
        if (reqBody.max_value !== undefined) {
            url += "&maxVal=" + reqBody.max_value;
        } else {
            url += "&maxVal=100000";
        }

        if (reqBody.searchKey !== undefined) {
            url += "&searchKey=" + reqBody.searchKey;
        }
        console.log(url)
        request.get(url, function (error, response, body) {
            console.log('In getBotResult ..', error, body);
            res.send(body);
        });
    }
    return {
        addItem: addItem,
        getItems: getItems,
        getBotResult: getBotResult
    }

})()

module.exports = itemModule