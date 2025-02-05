// index.js (New file)
const app = require("./server");

const PORT = process.env.SERVER_PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = server;
