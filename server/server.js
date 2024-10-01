

const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middelwares/errorHandler');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 9000;
const cors = require('cors');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/events', require('./routes/eventsRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

(async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
  } catch (error) {console.error('Failed to start server:', error.message);}
})();
