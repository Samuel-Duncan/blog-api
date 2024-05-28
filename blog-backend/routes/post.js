const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.postList);

router.post('/', postController.postCreate);

router.get('/:postId', postController.postDetail);

router.put('/:postId', postController.postUpdate);

router.delete('/:postId', postController.postDelete);

module.exports = router;
