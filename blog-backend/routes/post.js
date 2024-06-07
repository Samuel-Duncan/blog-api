const express = require('express');
const router = express.Router();
const verifyJWT = require('../verifyJWT');

const postController = require('../controllers/postController');

router.get('/', postController.postList);

router.post('/create', verifyJWT, postController.postCreate);

router.put('/edit/:postId', verifyJWT, postController.postUpdate);

router.delete('/:postId', verifyJWT, postController.postDelete);

router.get('/:postId', postController.postDetail);

module.exports = router;
