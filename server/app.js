require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const clientRouter = require("./routes/client/client");
const adminRouter = require("./routes/admin/admin");
const coachRouter = require("./routes/coach/coach");

const app = express();

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200);
});

app.use("/client", clientRouter);
app.use("/admin", adminRouter);
app.use("/coach", coachRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

module.exports = app;
