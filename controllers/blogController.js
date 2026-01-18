const Blog = require('../models/Blog');
const mongoose = require('mongoose');

exports.createBlog = async (req, res, next) => {
  try {
    const { title, body, author } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required.' });
    }
    const blog = new Blog({ title, body, author });
    const saved = await blog.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid blog id' });
    }
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid blog id' });
    }
    const { title, body, author } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required.' });
    }
    const updated = await Blog.findByIdAndUpdate(
      id,
      { title, body, author },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Blog not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid blog id' });
    }
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    next(err);
  }
};
