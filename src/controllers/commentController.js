const Comment = require('@/models/Comment.js');

/** GET 코멘트 조회 /api/comments */
async function getComments(req, res) {
  try {
    const page = parseInt(req.query.page) || 1; // 1부터 시작
    const size = parseInt(req.query.size) || 6;
    const skip = (page - 1) * size;
    const [data, totalComments] = await Promise.all([
      Comment.find({}).sort({ createdAt: 'desc' }).skip(skip).limit(size),
      Comment.countDocuments(),
    ]);

    const comments = data.map((item) => ({
      candidate: item.candidate_id,
      content: item.content,
      createdAt: item.createdAt,
    }));

    return res.status(200).json({
      comments,
      totalComments,
      totalPages: Math.ceil(totalComments / size),
      currentPage: page,
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

    if (!candidate || !content || content.trim() === '' || content.length > 30) {
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
