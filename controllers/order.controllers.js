const pool = require("../database/db");

exports.findAll = async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  try {
    const result = await pool.query(
      `
      SELECT orders.*, satellite_images.*
      FROM orders
      JOIN satellite_images ON orders.catalogID = satellite_images.catalogID
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};


exports.create = async (req, res) => {
  const catalogID = req.params.catalogID;
  try {
    // The catch worked fine, but I wanted to make a more informative error message if the customer just entered the catalogID incorrectly, which I figure would be the most likely cause of an error here.
    const catalogCheck = await pool.query(
      "SELECT 1 FROM satellite_images WHERE catalogID = $1",
      [catalogID]
    );
    if (catalogCheck.rowCount === 0) {
      return res.status(404).send("CatalogID not found/incorrect");
    }
    await pool.query("INSERT INTO orders(catalogID) VALUES($1)", [catalogID]);
    res.status(201).send("Order created successfully");
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
};
