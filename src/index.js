require('dotenv').config();

const connectDB = require('@/config/db');
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

// Routers
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Pick your president 🤖');
});

/** API */
apiRouter.get('/poll-results/national', getPollResultNational);
apiRouter.get('/poll-results/regions', getPollResultRegions);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
