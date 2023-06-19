import dotenv from "dotenv";
dotenv.config();

const config = {
  mongodb: {
    url: process.env.MONGODB_URI,
  },
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET || "S3H4US4H@!",
    ttl: "1h",
  },
};

export {config};