const express = require("express");
const userRoutes = require("./routes/userRoutes");
const apiRoutes = require("./routes/apiRoutes");
var cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/api", apiRoutes);

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
