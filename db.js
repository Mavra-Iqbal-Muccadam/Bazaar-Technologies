const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_PATH = './inventory.db';
const db = new sqlite3.Database(DB_PATH);

// Run schema file
const schema = fs.readFileSync(path.join(__dirname, 'models', 'schema.sql')).toString();
db.exec(schema, (err) => {
  if (err) console.error('Error initializing database:', err.message);
  else console.log('✅ Database initialized.');
});

module.exports = db;

  
