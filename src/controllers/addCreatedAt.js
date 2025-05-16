async function addCreatedAtField(model, date = new Date()) {
  try {
    const result = await model.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: date } }
    );

    console.log(`Updated ${result.nModified} comments with createdAt field.`);
  } catch (err) {
    console.error('Error updating comments:', err);
  }
}

function convertKoreanDateToUTC(koreanDate) {
  const [year, month, day] = koreanDate.split('.').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));

  return utcDate;
}

module.exports = { addCreatedAtField, convertKoreanDateToUTC };
