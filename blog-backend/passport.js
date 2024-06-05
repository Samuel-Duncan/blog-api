const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'your_secret_key', // Replace with a strong, unique secret key
};

const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const user = await User.findById(payload.userId);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  },
);

passport.use(jwtStrategy);

module.exports = passport;
