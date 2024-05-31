const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.postList);

router.post('/create', postController.postCreate);

router.put('/edit/:postId', postController.postUpdate);

router.delete('/:postId', postController.postDelete);

router.get('/:postId', postController.postDetail);

module.exports = router;
