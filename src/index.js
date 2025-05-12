require('dotenv').config();

const connectDB = require('@/config/db');
const { getComments, postComments } = require('@/controllers/commentController.js');
const {
  getPollResultNational,
  getPollResultRegions,
} = require('@/controllers/pollResultController.js');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;
const apiRouter = express.Router();

connectDB();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/', (_, res) => {
  res.send('Pick your president 🤖');
});

/** API */

// Routers
app.use('/api', apiRouter);

// 실시간 지지율
apiRouter.get('/poll-results/national', getPollResultNational);
apiRouter.get('/poll-results/regions', getPollResultRegions);

// 코멘트
apiRouter.get('/comments', getComments);
apiRouter.post('/comments', postComments);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
