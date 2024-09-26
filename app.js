const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message || "Server error",
    statusCode: err.status || 500,
  });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

module.exports = app;
