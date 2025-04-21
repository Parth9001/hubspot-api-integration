const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./geocache.db");

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS geocache (
      address TEXT PRIMARY KEY,
      lat REAL,
      lng REAL
    )
  `);
});

function getCoordsFromCache(address) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT lat, lng FROM geocache WHERE address = ?",
      [address],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

function storeCoordsInCache(address, lat, lng) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT OR REPLACE INTO geocache (address, lat, lng) VALUES (?, ?, ?)",
      [address, lat, lng],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

module.exports = {
  getCoordsFromCache,
  storeCoordsInCache,
};
