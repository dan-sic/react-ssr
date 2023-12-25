const express = require("express");
const path = require("path");
const { render } = require("./render");

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "..", "assets")));

app.get("/*", (req, res) => {
  render(req, res);
});

app.listen(3000, () => console.log("App is running on http://localhost:3000"));
