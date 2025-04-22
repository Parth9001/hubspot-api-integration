import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./geocache.db");

// Create table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS geocache (
      address TEXT PRIMARY KEY,
      lat REAL,
      lng REAL,
      city TEXT,
      state TEXT,
      country TEXT
    )
  `);
});

function getCoordsFromCache(address) {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT lat, lng, city, state, country FROM geocache WHERE address = ?",
      [address],
      (err, row) => {
        if (err) reject(err);
        else resolve(row);
      }
    );
  });
}

function storeCoordsInCache(address, lat, lng, city, state, country) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR REPLACE INTO geocache (address, lat, lng, city, state, country)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [address, lat, lng, city, state, country],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export default {
  getCoordsFromCache,
  storeCoordsInCache,
};
