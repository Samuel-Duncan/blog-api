const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.postList);

router.post('/', (req, res) => {});

router.get('/:postId', postController.postDetail);

router.put('/:postId', (req, res) => {});

router.delete('/:postId', (req, res) => {});

export default router;
