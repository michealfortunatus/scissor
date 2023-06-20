import dotenv from "dotenv";
dotenv.config();

const config = {
  base:process.env.BASE,
  port: process.env.PORT,
  mongodb: {
    url: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "S3H4US4H@!",
    ttl: "1h",
  },
};

export {config};