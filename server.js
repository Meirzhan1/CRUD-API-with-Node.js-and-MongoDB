const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

dotenv.config();

const connectDB = require('./config/db');
const blogRoutes = require('./routes/blogs');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/assignment3');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/blogs', blogRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
