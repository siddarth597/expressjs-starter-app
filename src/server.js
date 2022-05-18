require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT; // port at which server listening

const auth = require("./middlewares/auth.middleware");
const {
  globalErrorHandler,
  invalidRouteHandler,
} = require("./middlewares/error-handlers");

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
app.get("/", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Express JS starter API",
  });
});

// app.use(auth);

// fetch routes
let userRouter = require("./routes/user.route");

//define root routes.
app.use("/user", userRouter);

app.use(invalidRouteHandler);
app.use(globalErrorHandler);

app.listen(
  PORT,
  console.log(
    `server started in ${process.env.ENVIRONMENT} mode at port ${PORT}`
  )
);
