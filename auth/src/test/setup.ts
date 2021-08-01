import request  from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
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
  const email = 'tester1@hotmail.com';
  const password = 'password123';
  
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email,password
  })
  .expect(201);
  const cookie = response.get('Set-Cookie');
  return cookie;
};
