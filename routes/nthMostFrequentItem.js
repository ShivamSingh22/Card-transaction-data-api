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

router.get('/nth_most_total_item', async (req, res) => {
  const { item_by, start_date, end_date, n } = req.query;

  // Filter the dataset based on the date range
  const filteredData = dataset.filter((entry) => {
    const entryDate = new Date(entry.date);
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    return entryDate >= startDate && entryDate <= endDate;
  });

  if (item_by === 'quantity') {
    // Calculate the frequency of each item based on quantity sold
    const itemFrequency = {};
    filteredData.forEach((entry) => {
      const itemName = entry.software;
      const quantitySold = parseInt(entry.seats);
      if (itemFrequency[itemName]) {
        itemFrequency[itemName] += quantitySold;
      } else {
        itemFrequency[itemName] = quantitySold;
      }
    });

    // Sort the items based on quantity sold
    const sortedItems = Object.keys(itemFrequency).sort(
      (a, b) => itemFrequency[b] - itemFrequency[a]
    );

    if (n <= sortedItems.length) {
      res.json(sortedItems[n - 1]);
    } else {
      res.status(400).json('Invalid value of n');
    }
  } else if (item_by === 'price') {
    // Calculate the total price for each item
    const itemPrices = {};
    filteredData.forEach((entry) => {
      const itemName = entry.software;
      const quantitySold = parseInt(entry.seats);
      const price = parseInt(entry.amount);
      if (itemPrices[itemName]) {
        itemPrices[itemName] += quantitySold * price;
      } else {
        itemPrices[itemName] = quantitySold * price;
      }
    });

    // Sort the items based on total price
    const sortedItems = Object.keys(itemPrices).sort(
      (a, b) => itemPrices[b] - itemPrices[a]
    );

    if (n <= sortedItems.length) {
      res.json(sortedItems[n - 1]);
    } else {
      res.status(400).json('Invalid value of n');
    }
  } else {
    res.status(400).json('Invalid value of item_by');
  }
});

module.exports = router;
