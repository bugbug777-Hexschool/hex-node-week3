const express = require('express');
const router = express.Router();
const Post = require('../models/PostModel');
const errHandler = require('../handler/errHandler');

router.get('/',  async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: await Post.find()
  })
});

router.post('/',  async (req, res) => {
  try {
    const data = req.body;
    if (data.content !== '' && data.content !== undefined) {
      const newPost = await Post.create(data);
      res.status(200).json({
        status: 'success',
        data: newPost
      })
    } else {
      errHandler(res, 400, 40003)
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: error.message
    })
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.content !== '' && data.content !== undefined) {
      const editPost = await Post.findByIdAndUpdate(id, data);
      if (editPost !== null) {
        res.status(200).json({
          status: 'success',
          data: await Post.findById(editPost._id)
        })
      } else {
        errHandler(res, 400, 40002)
      }
    } else {
      errHandler(res, 400, 40004)
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: error.message
    })
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (id === 'posts') {
      await Post.deleteMany();
      res.status(200).json({
        status: 'success',
        data: []
      })
    } else {
      const deletePost = await Post.findByIdAndDelete(id);
      if (deletePost !== null) {
        res.status(200).json({
          status: 'success',
          data: await Post.find()
        })
      } else {
        errHandler(res, 400, 40002)
      }
    }
  } catch (error) {
    res.status(400).json({
      status: 'false',
      message: error.message
    })
  }
});

module.exports = router;