const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user');

exports.postList = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({}).sort({ timestamp: -1 });

  res.json(allPosts);
});

exports.postCreate = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Post title is required.')
    .escape(),
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Post text is required.')
    .escape(),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Respond with validation errors as JSON
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user._id, { _id: 1 });
    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      author: user._id,
    });

    await post.save();

    // Respond with success message or the created message data as JSON
    res
      .status(201)
      .json({ message: 'Post created successfully!', post });
  }),
];

exports.postDetail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post === null) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }

  res.json(post);
});

exports.postUpdate = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Post title is required.')
    .escape(),
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Post text is required.')
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, text: req.body.text },
      { new: true }, // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    // Respond with success message and optionally the updated post
    res
      .status(200)
      .json({ message: 'Post updated successfully!', updatedPost });
  }),
];
