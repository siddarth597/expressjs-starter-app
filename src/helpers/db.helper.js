const mongoose = require("mongoose");

const connectDb = async (req, res, next) => {
  mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useFindAndModify", false);
};

module.exports = connectDb;
