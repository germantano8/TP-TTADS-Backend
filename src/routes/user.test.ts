import { app } from '../index';
import { it, expect, describe, afterEach, beforeEach } from '@jest/globals';
import * as supertest from 'supertest';
import * as mongoose from 'mongoose';

const request = supertest(app.app);

beforeEach(async () => {
  await mongoose.connect(process.env.CONN_STRING);
})

afterEach(async () => {
  await mongoose.connection.close();
});

describe("User", () => {

  const validUser = {
    name: "test-name",
    surname: "test-surname",
    phone: "3415612566",
    email: "test_user@gmail.com",
    password: "Contraseña123",
    role: "63711eda36e5d8de86be2116",

  };

  it("Should be able to login", async () => {

    const response = await request.post("/api/users/login").send({ email: "admin@admin.com", password: "admin" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

  });


  it("Should be able to register", async () => {

    const response = await request.post("/api/users/register").send(validUser);

    if(response.body.email === "Email is already in use"){
      throw new Error("Testing user already exists. Please, delete it from the DB and run the test again")
    };
    
    expect(response.status).toBe(201);


  })

  describe("Should not be able to register when", () => {
    
    it("Phone is invalid", async () => {
      
      const response = await request.post("/api/users/register").send({...validUser,phone: "341"});

      expect(response.status).toBe(400)
      expect(response.body.phone).toBe("Not a valid Phone number")

    })

    it("Email is invalid", async () => {
      
      const response = await request.post("/api/users/register").send({...validUser,email: "test_usergmail.com"});

      expect(response.status).toBe(400)
      expect(response.body.email).toBe("Not a valid Email")

    })

    it("Password is not between 8 and 32 characters", async () => {
      
      const response = await request.post("/api/users/register").send({...validUser,password: "hi"});

      expect(response.status).toBe(400)
      expect(response.body.password).toBe("Password must be between 8 and 32 characters")

    })


  })

});




