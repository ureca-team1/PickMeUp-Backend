const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    candidate_id: { type: Number, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'comments' }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
