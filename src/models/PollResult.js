const mongoose = require('mongoose');

const pollResultSchema = new mongoose.Schema(
  {
    region_id: { type: Number, required: true },
    candidate_id: { type: Number, required: true },
    support_count: { type: Number, required: true },
  },
  { collection: 'poll_results' }
);

const PollResult = mongoose.model('PollResult', pollResultSchema);
module.exports = PollResult;
