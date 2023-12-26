const express = require("express");
const path = require("path");
const { render } = require("./render");

const app = express();

// point where express should look for client.bundle.js
app.use(express.static(path.join(__dirname, "..", "build")));

// routing handeled by react-router
app.get("/*", (req, res) => {
  render(req, res);
});

app.listen(3000, () => console.log("App is running on http://localhost:3000"));
