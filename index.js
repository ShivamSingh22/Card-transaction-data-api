const express = require('express');
const app = express();
const totalItemsRouter = require('./routes/totalItems');
const nthMostFrequentItemRouter = require('./routes/nthMostFrequentItem');
const percentageRouter = require('./routes/percentage');
const monthlySalesRouter = require('./routes/monthlySales');

// Middleware
app.use(express.json());

// Routes
app.use('/api', totalItemsRouter);
app.use('/api', nthMostFrequentItemRouter);
app.use('/api', percentageRouter);
app.use('/api', monthlySalesRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
