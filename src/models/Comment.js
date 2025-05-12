const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    candidate_id: { type: Number, required: true },
    content: { type: String, required: true },
  },
  { collection: 'comments' }
);

module.exports = mongoose.model('Comment', commentSchema);
