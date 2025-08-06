const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { jwtkey } = require('../keys');
const UserSignup = require('../Models/UserAuthSchema');
const mongoose = require('mongoose');

// Validation schema for signup using Joi
const signupSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  mobile: Joi.string().required().label('Mobile'),
  password: Joi.string().required().label('Password'),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password')
    .messages({ 'any.only': 'Passwords must match' }),
});

// Validation schema for login using Joi
const loginSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
});

// Route: POST /signup
router.post('/Usersignup', async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { name, email, mobile, password } = req.body;

    let user = await UserSignup.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new UserSignup({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, jwtkey);

    res.status(201).send({ token, userId: user._id, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route: POST /login
router.post('/Userlogin', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    let user = await UserSignup.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtkey);

    res.status(200).send({ token, userId: user._id, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route: GET /user/:id 
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: 'Invalid user ID' });
    }

    const user = await UserSignup.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({
      userId: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Validation schema for updating user details using Joi
const updateSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  mobile: Joi.string().required().label('Mobile'),
});

// Route: PUT /user/:id 
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, mobile } = req.body;

    const { error } = updateSchema.validate({ name, mobile });
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const updatedUser = await UserSignup.findByIdAndUpdate(
      userId,
      { name, mobile },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send({
      userId: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      message: 'User details updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route: GET /users (get all users)
router.get('/', async (req, res) => {
  try {
    const users = await UserSignup.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
