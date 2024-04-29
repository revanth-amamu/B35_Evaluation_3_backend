const express = require('express');
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth.middleware');
const access = require('../middlewares/access.middleware');
require('dotenv').config();

const userRouter = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     description: signup to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username of the user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email of the user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: role
 *         description: User's role.
 *         in: formData
 *         required: false
 *         type: string
 *     body:
 *       type: object
 *     responses:
 *       200:
 *         description: User Registered Successfully..!
 */

userRouter.post('/register', (req, res) => {

    const { username, email, password, role } = req.body;
    try {
        bcrypt.hash(password, 10, async(err, hash) => {

            if (err) {
                res.status(400).json({ message: "Error while hashing" });
            }    
            else {
                const user = new UserModel({
                    username,
                    email,
                    password : hash,
                    role
                })
    
                await user.save();
    
                res.status(200).json({ message: "User Registered Successfully..!"});
            }
        })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

userRouter.get("/", auth, access("admin", "manager"), async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ message: "Details of all users", users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

userRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {

                if (err) {
                    res.status(400).json({ message: err.message });
                }
                if (result) {
                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h'});
                    res.status(200).json({ message: "Login Successful..!", token});
                }
                else {
                    res.status(400).json({ message: "Invalid Credentials..."});
                }
            })
        }
        else {
            res.status(400).json({ message: "Please Register..."});
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

module.exports = userRouter;