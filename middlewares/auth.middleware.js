const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
require('dotenv').config();

const auth = (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

        if (err) {
            res.status(400).json({ message: "Error while verifying the token..."});
        }
        const { userId, role } = decoded;
        
        req.userId = userId
        req.role = role
        next();
    })
}

module.exports = auth;