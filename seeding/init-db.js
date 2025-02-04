// This one was a joint effort between me watching Youtube tutorials on seeding with SQL and Copilot helping me adjust the code to fit this project.

const fs = require("fs");
const pool = require("../database/db");
const path = require("path");

// Start by creating tables for the satellite images as well as orders.
const createTables = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS satellite_images (
          catalogID TEXT PRIMARY KEY,
          acquisitionDateStart TIMESTAMP,
          acquisitionDateEnd TIMESTAMP,
          offNadir NUMERIC,
          resolution NUMERIC,
          cloudCoverage NUMERIC,
          sensor TEXT,
          scanDirection TEXT,
          satelliteElevation NUMERIC,
          imageBands TEXT,
          geometry GEOMETRY(Polygon, 4326)
        );
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS orders (
          orderID SERIAL PRIMARY KEY,
          catalogID TEXT REFERENCES satellite_images(catalogID),
          orderDate TIMESTAMP DEFAULT NOW()
        );
      `);
      
      console.log("Tables created successfully!");
    } catch (error) {
      console.error("Error creating tables:", error);
    } finally {
      client.release();
    }
  };

// Then seed the database with satellite images from the JSON file.
const seedData = async () => {
  try {
    const filePath = path.join(__dirname, 'satellite_images.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const image of data) {
      await pool.query(
        `INSERT INTO satellite_images (catalogID, acquisitionDateStart, acquisitionDateEnd, offNadir, resolution, cloudCoverage, sensor, scanDirection, satelliteElevation, imageBands, geometry)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (catalogID) DO NOTHING;`,
        [
          image.catalogID,
          image.acquisitionDateStart,
          image.acquisitionDateEnd,
          image.offNadir,
          image.resolution,
          image.cloudCoverage,
          image.sensor,
          image.scanDirection,
          image.satelliteElevation,
          image.imageBands,
          image.geometry
        ]
      );
    }
    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    pool.end();
  }
};

const initDB = async () => {
  await createTables();
  await seedData();
};

initDB();
