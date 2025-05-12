const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema(
  { _id: { type: Number, required: true }, respondent_count: { type: Number, required: true } },
  { collection: 'regions' }
);

const Region = mongoose.model('Region', regionSchema);
module.exports = Region;
