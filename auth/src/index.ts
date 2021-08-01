import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("Starting up..");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY MUST BE DEFINED");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!");
  });
};

start();
