/* eslint-disable quotes */
require("dotenv").config();
const { PORT, CLIENT_ORIGIN } = require("./config");
const express = require("express");
const cors = require("cors");
const catRouter = require("./animals/cat-router");
const dogRouter = require("./animals/dog-router");

const app = express();
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use("/api/cats", catRouter);
app.use("/api/dogs", dogRouter);

// Catch-all 404
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get("env") === "development" ? err : {}
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
