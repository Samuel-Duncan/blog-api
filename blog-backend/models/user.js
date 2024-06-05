const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum length of 8 characters
    validate: {
      validator: function (v) {
        // Regex for password pattern (at least 1 number, 1 special character)
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])/;
        return passwordRegex.test(v);
      },
      message:
        'Password must be at least 8 characters and include at least one number and one special character!',
    },
  },
  isAuthor: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Hash password before saving user
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Full name
UserSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', UserSchema);
