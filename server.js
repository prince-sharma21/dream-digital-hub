// Dream Digital Hub - Server
// Simple static website server. No login, no database, no admin panel -
// all content lives directly in public/data.json and is edited by hand.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Dream Digital Hub running at http://localhost:${PORT}`);
});
