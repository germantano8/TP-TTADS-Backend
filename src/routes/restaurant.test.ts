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

describe("Restaurant", () => {

  const validRestaurant = {
    name: "Test Restaurant",
    description: "Test Restaurant desc",
    deliveryPricePerKm: 10,
    deliveryPriceBase: 100,
    tags: ["62ae0619482316674ad97563"],
    location: "62d899be290e6947362fc7f1"

  };

  it("Should be able to be created", async () => {

    const response = await request.post("/api/restaurants").send(validRestaurant);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Restaurant created successfully");

  });

  describe("Should not be able to be created when", () => {

    it("Description is not between 4 and 20 characters", async () => {

      const response = await request.post("/api/restaurants").send({ ...validRestaurant, description: "Somos Restaurant Test" });

      expect(response.status).toBe(400)
      expect(response.body.description).toBe("Description must be between 4 and 20 characters")

    })

    it("Delivery Price Per Km is not a number greater than 0", async () => {

      const response = await request.post("/api/restaurants").send({ ...validRestaurant, deliveryPricePerKm: -5 });

      expect(response.status).toBe(400)
      expect(response.body.deliveryPricePerKm).toBe("Delivery price per km must be a number greater than 0")

    })

    it("Location is an invalid Mongoose ID", async () => {

      const response = await request.post("/api/restaurants").send({ ...validRestaurant, location: "31231231" });

      expect(response.status).toBe(400)
      expect(response.body.location).toBe("Location must be a valid id")

    })

  })

});




