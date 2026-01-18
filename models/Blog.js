const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    author: { type: String, default: 'Anonymous' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
