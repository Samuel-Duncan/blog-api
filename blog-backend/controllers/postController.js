const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');

exports.postList = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}).sort({ timestamp: -1 });

  res.send(allPosts);
});

exports.postDetail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }

  res.send(post);
});
