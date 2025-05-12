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
    return res.status(500).end();
  }
}

/** POST 코멘트 추가 /api/comments */
async function postComments(req, res) {
  try {
    const { candidate, content } = req.body;

    if (!candidate || !content || content.trim() === '' || content.length > 40) {
      const message = 'Invalid input provided.';
      console.error(message);
      return res.status(400).json({ message });
    }

    const comment = new Comment({
      candidate_id: candidate,
      content,
    });

    await comment.save();

    return res.status(200).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}

module.exports = {
  getComments,
  postComments,
};
