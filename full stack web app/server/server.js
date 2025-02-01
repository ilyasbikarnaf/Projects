const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv").config();

const mysqlPool = require("./config/db");
const userRouter = require("./routes/userRoutes");
const imageRouter = require("./routes/imageRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/images", imageRouter);

mysqlPool.query("SELECT 1").then(() => {
  console.log("Mysql database connected");

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
