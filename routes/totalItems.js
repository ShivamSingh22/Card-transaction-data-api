const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');

// Function to load the dataset from the CSV file
const loadDataset = () => {
  return new Promise((resolve, reject) => {
    const dataset = [];
    fs.createReadStream('data.csv')
      .pipe(csv())
      .on('data', (data) => {
        dataset.push(data);
      })
      .on('end', () => {
        console.log('Dataset loaded');
        resolve(dataset);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

router.get('/total_items', async (req, res) => {
  const { start_date, end_date, department } = req.query;

  console.log('Received parameters:');
  console.log('start_date:', start_date);
  console.log('end_date:', end_date);
  console.log('department:', department);

  try {
    // Load the dataset
    const dataset = await loadDataset();

    console.log('Dataset:');
    console.log(dataset);

    // Filter the dataset based on the department and date range
    const filteredData = dataset.filter((entry) => {
      // Convert the date strings to Date objects for comparison
      const entryDate = new Date(entry.date);
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      return (
        entry.department.toLowerCase() === department.toLowerCase() &&
        entryDate >= startDate &&
        entryDate <= endDate
      );
    });

    console.log('Filtered data:');
    console.log(filteredData);

    // Calculate the total number of items sold
    const totalItems = filteredData.reduce((sum, entry) => sum + parseInt(entry.seats), 0);

    console.log('Total items:', totalItems);

    res.json(totalItems);
  } catch (error) {
    console.error('Error loading dataset:', error);
    res.status(500).json({ error: 'Failed to load dataset' });
  }
});

module.exports = router;
