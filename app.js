const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const coursesRouter = require("./routes/course");
const categoryRouter = require("./routes/category");
const commentRouter = require("./routes/comment");
const contactRouter = require("./routes/contact");
const notificationRouter = require("./routes/notification");
const discountRouter = require("./routes/discount");
const newsLetterRouter = require("./routes/newsLetter");
const searchRouter = require("./routes/search");
const departmentRouter = require("./routes/department");
const ticketRouter = require("./routes/ticket");
const orderRouter = require("./routes/order");
const articleRouter = require("./routes/article");
const menuRouter = require("./routes/menu");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public", "uploads")));

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message || "Server error",
    statusCode: err.status || 500,
  });
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/course", coursesRouter);
app.use("/comment", commentRouter);
app.use("/contact", contactRouter);
app.use("/notification", notificationRouter);
app.use("/discount", discountRouter);
app.use("/newsLetter", newsLetterRouter);
app.use("/search", searchRouter);
app.use("/department", departmentRouter);
app.use("/ticket", ticketRouter);
app.use("/order", orderRouter);
app.use("/article", articleRouter);
app.use("/menu", menuRouter);

module.exports = app;
