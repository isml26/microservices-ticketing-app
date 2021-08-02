import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("Starting up..");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY MUST BE DEFINED");
  }
  if (!process.env.MONGO_URI){
    throw new Error('Mongo_URI must be defined!')
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("wtf");
    
    console.log("Listening on port 3000!!");
  });
};

start();