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

router.get('/monthly_sales', (req, res) => {
  const { product, year } = req.query;

  // Filter the dataset based on the product and year
  const filteredData = dataset.filter((entry) => {
    const entryYear = new Date(entry.date).getFullYear().toString();
    const entryProduct = entry.software.toLowerCase();
    return entryProduct === product.toLowerCase() && entryYear === year;
  });

  // Calculate the monthly sales
  const monthlySales = Array.from({ length: 12 }, (_, month) => {
    const monthData = filteredData.filter((entry) => {
      const entryMonth = new Date(entry.date).getMonth();
      return entryMonth === month;
    });

    const sales = monthData.reduce((total, entry) => total + parseFloat(entry.amount), 0);
    return sales;
  });

  res.json(monthlySales);
});

module.exports = router;
