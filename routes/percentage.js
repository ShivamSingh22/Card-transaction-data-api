const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');

// Reading the dataset from the CSV file
const dataset = [];
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => {
    dataset.push(data);
  })
  .on('end', () => {
    console.log('Dataset loaded');
  });

router.get('/percentage_of_department_wise_sold_items', (req, res) => {
  const { start_date, end_date } = req.query;

  // Filter the dataset based on the date range
  const filteredData = dataset.filter((entry) => {
    const entryDate = new Date(entry.date);
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    return entryDate >= startDate && entryDate <= endDate;
  });

  // Calculate the total sold items (seats) per department
  const departmentWiseSoldItems = {};
  filteredData.forEach((entry) => {
    const department = entry.department.toLowerCase();
    const seats = parseInt(entry.seats);

    if (department in departmentWiseSoldItems) {
      departmentWiseSoldItems[department] += seats;
    } else {
      departmentWiseSoldItems[department] = seats;
    }
  });

  // Calculate the total sold items across all departments
  const totalSoldItems = Object.values(departmentWiseSoldItems).reduce((sum, seats) => sum + seats, 0);

  // Calculate the percentage of sold items per department
  const percentagePerDepartment = {};
  Object.entries(departmentWiseSoldItems).forEach(([department, seats]) => {
    const percentage = ((seats / totalSoldItems) * 100).toFixed(2);
    percentagePerDepartment[department] = `${percentage}%`;
  });

  res.json(percentagePerDepartment);
});

module.exports = router;
