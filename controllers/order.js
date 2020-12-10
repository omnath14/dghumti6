const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { sendEmail } = require('../helpers');


exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }

        const emailData = {
            to: 'dghumti@gmail.com',
            from: 'Dghumti.com',
              subject: `A new order is received from ${order.user.name}`,

            html: `
           <h4>Customer name: ${order.user.name}</h4>
           <h4> Name: ${order.address}</h4>
           <h4>phone number: ${order.phone}</h4>
             <h4> Delivery address: ${order.exactaddress}</h4>
              
            <h5>Login to Admin page of Dghumti to view order details.</h5>
        `
        };
        sendEmail(emailData);
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', '_id name address')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

exports.updateOrderStatus = (req, res) => {
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};
