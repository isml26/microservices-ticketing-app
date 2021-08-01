import request from "supertest";
import { app } from "../../../app";

it("returns a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tester1@hotmail.com",
      password: "password123",
    })
    .expect(201);
});

it("return a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tester1",
      password: "password123",
    })
    .expect(400);
});

it("return a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tester1",
      password: "pa",
    })
    .expect(400);
});

it("return a 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "tester@hotmai.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "password123" })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@hotmail.com",
      password: "password123",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@hotmail.com",
      password: "password123",
    })
    .expect(400);
});

it("seta a cookie after successfull signup", async () => {
    const response = await request(app)
    .post("/api/users/signup")
    .send({ 
    email: "tester@hotmail.com", 
    password: "password123" })
    .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});
