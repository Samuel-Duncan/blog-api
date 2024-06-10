const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const verifyJWT = require('../verifyJWT');

const Post = require('../models/post');
const User = require('../models/user');

exports.postList = async (req, res, next) => {
  try {
    const allPosts = await Post.find({}).sort({ timestamp: -1 });

    if (!allPosts) {
      return res.json({ message: 'No posts found!' });
    }

    res.json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.userPostList = [
  verifyJWT,

  async (req, res, next) => {
    try {
      const userPosts = await Post.find({
        author: req.user.userId,
      }).sort({ timestamp: 1 });

      if (!userPosts) {
        return res.json({ message: 'No posts found!' });
      }

      res.json(userPosts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

exports.postCreate = [
  verifyJWT,

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Post title is required.'),
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Post text is required.'),
  body('isPublished').isBoolean().optional(),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Respond with validation errors as JSON
        return res.status(400).json({ errors: errors.array() });
      }

      console.log(req.user.userId);

      const post = new Post({
        title: req.body.title,
        text: req.body.text,
        isPublished: req.body.isPublished,
        author: req.user.userId,
      });

      await post.save();

      // Respond with success message or the created message data as JSON
      res
        .status(201)
        .json({ message: 'Post created successfully!', post });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  },
];

exports.postDetail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postId);
  if (post === null) {
    const err = new Error('Post not found');
    err.status = 404;
    return next(err);
  }

  res.json(post);
});

exports.postUpdate = [
  verifyJWT,

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Post title is required.'),
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Post text is required.'),
  body('isPublished').isBoolean().optional(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      text: req.body.text,
      isPublished: req.body.isPublished,
      author: req.user.userId,
      _id: req.params.postId,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), post });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      post,
      { new: true }, // Return the updated document
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    // Respond with success message and optionally the updated post
    res.status(200).json({ message: 'Post updated successfully!' });
  }),
];

exports.postDelete = [
  verifyJWT,

  asyncHandler(async (req, res, next) => {
    const post = await Post.findByIdAndDelete(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found!' });
    }

    res.status(200).json({ message: 'Post deleted successfully!' });
  }),
];
