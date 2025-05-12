const mongoose = require('mongoose');

const pollResultSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    region_id: { type: Number, required: true },
    candidate_id: { type: Number, required: true },
    support_count: { type: Number, required: true },
  },
  { collection: 'poll_results' }
);

module.exports = mongoose.model('PollResult', pollResultSchema);
