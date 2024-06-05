const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signUp = [
  // Validate and sanitize User data
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required!')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters.'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required!')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required!')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email already exists!');
      }
      return true;
    })
    .withMessage('Email already exists!'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])/)
    .withMessage(
      'Password must contain at least one number and one special character!',
    ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // User creation with reference to hashed password (no need to re-hash)
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password, // Already hashed in the User model pre-save hook
    });

    await user.save();

    // Optional JWT generation logic
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'your_secret_key'); // Replace with same secret as jwtStrategy

    // Handle potential JWT signing error
    if (!token) {
      return res
        .status(500)
        .json({ message: 'Error generating JWT token' });
    }

    res
      .status(201)
      .json({ message: 'User created successfully', token });
  }),
];

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' });
    }

    // Generate JWT token on successful login
    const payload = { userId: user._id, isAdmin: user.isAdmin };
    const token = jwt.sign(payload, 'your_secret_key'); // Replace with same secret as jwtStrategy

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logOut = async (req, res, next) => {
  try {
    req.logout((err) => {
      // Call logout from Passport (if using sessions)
      if (err) {
        return next(err);
      }
      // Invalidate JWT token on client-side (example)
      res.cookie('jwt', '', { maxAge: 0, httpOnly: true }); // Clear the cookie
      res.status(200).json({ message: 'Logged Out' }); // Success response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
