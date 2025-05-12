const PollResult = require('@/models/PollResult.js');

/** POST 투표하기 /api/vote */
async function castVote(req, res) {
  try {
    const { region, candidate } = req.body;

    if (!region || !candidate) {
      const message = 'Invalid input provided.';
      console.error(message);
      return res.status(400).json({ message });
    }

    await PollResult.findOneAndUpdate(
      { region_id: region, candidate_id: candidate },
      { $inc: { support_count: 1 } }
    );

    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}

/** POST 투표 취소하기 /api/vote/cancel */
async function revokeVote(req, res) {
  try {
    const { region, candidate } = req.body;

    if (!region || !candidate) {
      const message = 'Invalid input provided.';
      console.error(message);
      return res.status(400).json({ message });
    }

    await PollResult.findOneAndUpdate(
      { region_id: region, candidate_id: candidate },
      { $inc: { support_count: -1 } }
    );

    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}

module.exports = {
  castVote,
  revokeVote,
};
