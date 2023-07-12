// const mongoose= require("mongoose");
// const request = require("supertest");
// const app= require("../server")
// const config= require("../config/config");

import mongoose from "mongoose";
import Redis from "redis";
import request from "supertest";
import app from "../app.js";
import {config} from "../config/config.js";
import {cache} from "../config/redis.js"



const MONGODB_URI= config.mongodb.url

/* Connecting to the database before each test. */
beforeEach(async() => {
    await mongoose.connect(MONGODB_URI);
});

/* Closing database connection after each test. */

afterEach(async() => {
    await mongoose.connection.close();
    cache.closeInstance())
    
});



describe("GET /by-user", () => {
    ("should return all urls shortened by a user", async () => {
      const res = await request(app).get("/by-user");
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });