const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');
const config=require('config');
const { sendEmail } = require('../helpers');
const _ = require('lodash');
exports.signup = (req, res) => {

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({

                error: 'Email is already taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user});
    });
};

exports.signin = (req, res) => {

    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please Create new account'
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password donot match'
            });
        }

        const token = jwt.sign({ _id: user._id },config.get('jwtSecret'));
        res.cookie('t', token, { expire: new Date() + 9999 });

        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: config.get('jwtSecret'),
    userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};


exports.forgotPassword = (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'No request body' });
    if (!req.body.email) return res.status(400).json({ message: 'No Email in request body' });

    console.log('forgot password finding user with that email');
    const { email } = req.body;
    console.log('signin req.body', email);

    User.findOne({ email }, (err, user) => {

        if (err || !user)
            return res.status('401').json({
                error: 'User with that email does not exist!'
            });


        const token = jwt.sign({ _id: user._id, iss:  config.get('name') },  config.get('jwtSecret'));

        const emailData = {
            from: 'dghumti@gmail.com',
            to: email,
            subject: 'Password Reset:Dghumti',

            text: `Please use the following link to reset your password: ${config.get('client')}/reset-password/${token}`,

            html: `<p>Please use the following link to reset your password:</p> 
             <p>${config.get('client')}/reset-password/${token}</p>`
        };

        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.json({ message: err });
            } else {
                sendEmail(emailData);
                return res.status(200).json({
                    message: `Password reset link has been sent to email: ${email}`
                });
            }
        });
    });
};



exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;

    User.findOne({ resetPasswordLink }, (err, user) => {

        if (err || !user)
            return res.status('401').json({
                error: 'Link has expired, try again.'
            });

        const updatedFields = {
            password: newPassword,
            resetPasswordLink: ''
        };

        user = _.extend(user, updatedFields);
        user.updated = Date.now();

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: `Password Successfully changed! Now you can login with your new password.`
            });
        });
    });
};






























