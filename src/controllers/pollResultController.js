const { REGIONS } = require('@/config/constants.js');
const PollResult = require('@/models/PollResult.js');

/** GET 전체 지지율 조회 /api/poll-results/national */
async function getPollResultNational(_, res) {
  try {
    const data = await PollResult.find({});
    const totalRespondents = data.reduce((acc, curr) => acc + curr.support_count, 0);
    const results = data.map((item) => ({
      candidate: item.candidate_id,
      supportCount: item.support_count,
    }));

    return res.status(200).json({
      totalRespondents,
      results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(data);
  }
}

/** GET 지역별 지지율 조회 /api/poll-results/regions */
async function getPollResultRegions(_, res) {
  try {
    const data = await PollResult.find({});
    const pollResults = [];

    Object.keys(REGIONS).forEach((regionId) => {
      const target = data.filter((item) => item.region_id === Number(regionId));
      const respondentCount = target.reduce((acc, curr) => acc + curr.support_count, 0);
      const results = target.map((item) => ({
        candidate: item.candidate_id,
        supportCount: item.support_count,
      }));
      pollResults.push({ region: Number(regionId), respondentCount, results });
    });

    return res.status(200).json({ pollResults });
  } catch (err) {
    console.error(err);
    return res.status(500).json(data);
  }
}

module.exports = {
  getPollResultNational,
  getPollResultRegions,
};
