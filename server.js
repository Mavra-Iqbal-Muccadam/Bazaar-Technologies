const express = require('express');
const bodyParser = require('body-parser');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', inventoryRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Inventory Service running at http://localhost:${PORT}`);
});
