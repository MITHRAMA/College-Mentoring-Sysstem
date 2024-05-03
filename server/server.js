const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb+srv://mithra:mithra@cluster0.3mlcilt.mongodb.net/mydb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// MongoDB Schema
const DataSchema = new mongoose.Schema({
  semNumber: Number,
  sgpa: Number,
  columns: [
    {
      subject: String,
      month: String,
      finalGrade: String,
      credits: Number,
      status: String,
    },
  ],
});

const Data = mongoose.model('Data', DataSchema);

// API to handle form submissions
app.post('/api/submitData', async (req, res) => {
  try {
    const formData = req.body;
    const existingSemester = await Data.findOne({ semNumber: formData.semNumber });

    if (existingSemester) {
      // Update the existing semester data
      existingSemester.sgpa = formData.sgpa;
      existingSemester.columns = formData.columns;
      await existingSemester.save();
      res.json(existingSemester);
    } else {
      // Create a new semester record
      const savedData = await Data.create(formData);
      res.json(savedData);
    }
  } catch (error) {
    console.error('Error saving data to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API to retrieve data
app.get('/api/getData', async (req, res) => {
  try {
    const allData = await Data.find();
    res.json(allData);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
