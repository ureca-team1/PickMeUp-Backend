async function addCreatedAtField(model) {
  try {
    // Update all existing comments to add createdAt field
    const result = await model.updateMany(
      { createdAt: { $exists: false } }, // Only update comments without createdAt
      { $set: { createdAt: new Date() } } // Set createdAt to the current date
    );

    console.log(`Updated ${result.nModified} comments with createdAt field.`);
  } catch (err) {
    console.error('Error updating comments:', err);
  }
}

module.exports = addCreatedAtField;
