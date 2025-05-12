const Comment = require('@/models/Comment.js');

/** GET 코멘트 조회 /api/comments */
async function getComments(_, res) {
  try {
    const data = await Comment.find({});
    const comments = data.map((item) => ({ candidate: item.candidate_id, content: item.content }));

    return res.status(200).json({
      comments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(data);
  }
}

module.exports = {
  getComments,
};
