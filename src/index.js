require('dotenv').config();

const connectDB = require('@/config/db');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
