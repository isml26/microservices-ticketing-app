import request  from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}
//that function is going to run before all
//of our tests start to be execudet
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "kunefe";

  mongo = new MongoMemoryServer();
  await mongo.start();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  //Build a JWT payload {id email}
  const payload=  {
    id:'123456789',
    email:'tester@hotmail.com'
  };

  //Create JWT!
  const token = jwt.sign(payload,process.env.JWT_KEY!);
    
  //Build session object { jwt: MY_JWT}
  const session = { twt: token };

  //Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  //Take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return a string thats the cookie with encoded data
  return [`express:sess=${base64}`];
};