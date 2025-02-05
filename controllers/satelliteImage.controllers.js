const pool = require("../database/db");

exports.findAll = async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;
  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;
  try {
    const result = await pool.query("SELECT * FROM satellite_images LIMIT $1 OFFSET $2", [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.findOne = async (req, res) => {
    try {
        const catalogID = req.params.catalogID;
        const result = await pool.query("SELECT * FROM satellite_images WHERE catalogID = $1;", [catalogID]);
        if (result.rowCount === 0) {
            return res.status(404).send("CatalogID not found/incorrect");
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
}