import mongoose from "mongoose";
import config from "@boots/config-loader";

export const mongoDBConnect = async () => {
  try {
    const {connectionString} = config.mongoDB;
    console.log("🚀 ~ file: mongoDB.js ~ line 7 ~ mongoDBConnect ~ connectionString", connectionString)
    mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => {
      console.log("Connection successfully.");
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: mongoDB.js ~ line 9 ~ mongoDBConnect ~ error",
      error
    );
  }
};
