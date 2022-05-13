require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const auth = require("./middlewares/auth.middleware");

const PORT = process.env.PORT; // port at which server listening

app.use(express.json());
app.use(cors());
app.options("*", cors());

//conncect to db

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useFindAndModify", false);

// sample for express server
app.get("/", async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Express JS starter API",
  });
});

app.use(auth);

// fetch routes
let userRouter = require("./routes/user.route");

//define root routes.
app.use("/user", userRouter);

// Invalid routes handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Global Error handler
app.use((err, req, res, next) => {
  //respond to client
  const status = err.status || 500;

  res.status(status).json({
    error: {
      message: err.message,
    },
  });
  console.error(JSON.stringify(err));
});

app.listen(
  PORT,
  console.log(
    `server started in ${process.env.ENVIRONMENT} mode at port ${PORT}`
  )
);
