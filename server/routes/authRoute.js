const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
require('dotenv').config()

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;    //parameter (header body param)

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });  //findone mongodb for email finding in db = null/userdata
        //complete object will be stored in user of user

        if (!user) {
            return res.status(401).json({ message: 'Incorrect email or user does not exist' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);   //(0/1) object is there so use . 

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, "123@abc", { expiresIn: '4h' });  //token 
        const {profileImage , firstName, lastName } = user;
        res.status(200).json({ message: 'Login successful', token , profileImage , email , firstName , lastName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            profileImage : `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/profile', (req, res) => {
    res.json(req.user);
});

module.exports = router;
