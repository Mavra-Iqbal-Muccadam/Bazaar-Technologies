const db = require('./db');

function listProductsAndStock() {
  const query = `
    SELECT 
      p.id, 
      p.name, 
      p.sku,
      IFNULL(SUM(CASE WHEN sm.type = 'stock-in' THEN sm.quantity ELSE 0 END), 0) -
      IFNULL(SUM(CASE WHEN sm.type IN ('sale', 'removal') THEN sm.quantity ELSE 0 END), 0) AS current_stock
    FROM products p
    LEFT JOIN stock_movements sm ON p.id = sm.product_id
    GROUP BY p.id;
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching products:", err.message);
      return;
    }

    console.log("📦 Current Inventory Overview:");
    console.table(rows);
  });
}

listProductsAndStock();
