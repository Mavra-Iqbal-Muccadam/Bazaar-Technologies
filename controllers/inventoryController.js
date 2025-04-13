const db = require('../db');

exports.addProduct = (req, res) => {
  const { name, sku } = req.body;
  db.run(`INSERT INTO products (name, sku) VALUES (?, ?)`, [name, sku], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name, sku });
  });
};

exports.recordMovement = (req, res) => {
  const { product_id, type, quantity } = req.body;
  db.run(`INSERT INTO stock_movements (product_id, type, quantity) VALUES (?, ?, ?)`, [product_id, type, quantity], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Movement '${type}' recorded.`, id: this.lastID });
  });
};

exports.getCurrentStock = (req, res) => {
  const { product_id } = req.params;
  const query = `
    SELECT 
      SUM(CASE WHEN type = 'stock-in' THEN quantity ELSE 0 END) -
      SUM(CASE WHEN type IN ('sale', 'removal') THEN quantity ELSE 0 END) AS current_stock
    FROM stock_movements
    WHERE product_id = ?
  `;
  db.get(query, [product_id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ product_id, current_stock: row.current_stock || 0 });
  });
};
