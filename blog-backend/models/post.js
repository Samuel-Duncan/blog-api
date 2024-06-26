const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublished: {
    type: Boolean,
    default: false,
    required: true,
  },
});

PostSchema.virtual('url').get(function () {
  return `${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
