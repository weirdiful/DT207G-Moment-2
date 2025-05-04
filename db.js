const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

//Databas

async function initDB() {
    const db = await open({
      filename: './cv.sqlite',
      driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS workexperience (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          companyname TEXT NOT NULL,
          jobtitle TEXT NOT NULL,
          location TEXT NOT NULL,
          startdate TEXT NOT NULL,
          enddate TEXT NOT NULL,
          description TEXT
        )
      `);
    
      return db;
    }
    
    module.exports = initDB;

    