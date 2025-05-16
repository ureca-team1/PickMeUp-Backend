async function addCreatedAtField(model, date = new Date()) {
  try {
    const result = await model.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: date.toISOString() } }
    );

    console.log(`Updated ${result.nModified} comments with createdAt field.`);
  } catch (err) {
    console.error('Error updating comments:', err);
  }
}

module.exports = { addCreatedAtField, convertKoreanDateToUTC };
