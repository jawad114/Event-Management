const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();
const crypto = require('crypto');

require('dotenv').config();

exports.register = async (req, res) => {
    const { name, email, gender, password } = req.body; 
    console.log(name, email, gender, password);
    try {
      let user = await User.findOne({ email: email.toLowerCase() });
      if (user) {return res.status(400).json({ message: 'User already exists' });}
      user = new User({ name, email: email.toLowerCase(), gender });
      const hash = crypto.createHash('sha256').update(password.trim()).digest('hex');
      user.password = hash;
      console.log("Reg time hashed", hash);
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };



  exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("login time",email, password);
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) { return res.status(401).json({ message: 'Invalid email or password' }); }
         const hash = crypto.createHash('sha256').update(password.trim()).digest('hex');
      if (hash !== user.password) {return res.status(401).json({ message: 'Invalid email or password' });}
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  