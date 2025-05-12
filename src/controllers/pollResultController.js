const { REGIONS, CANDIDATES } = require('@/config/constants.js');
const PollResult = require('@/models/PollResult.js');

/** GET 전체 지지율 조회 /api/poll-results/national */
async function getPollResultNational(_, res) {
  try {
    const data = await PollResult.find({});
    const totalRespondents = data.reduce((acc, curr) => acc + curr.support_count, 0);

    const results = [];

    Object.keys(CANDIDATES).forEach((candidateId) => {
      const target = data.filter((item) => item.candidate_id === Number(candidateId));
      const supportCount = target.reduce((acc, curr) => acc + curr.support_count, 0);
      results.push({ candidate: candidateId, supportCount });
    });

    return res.status(200).json({
      totalRespondents,
      results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).end();
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
    return res.status(500).end();
  }
}

module.exports = {
  getPollResultNational,
  getPollResultRegions,
};
