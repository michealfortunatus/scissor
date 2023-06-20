import express from "express";
import {config} from "./config/config.js";
import { connectToMongoDB } from "./db/db.js";
import authMiddleware from "./middleware/authentication.middleware.js";

import urlRoute from "./routes/url.route.js";
import userRoutes from "./routes/user.route.js";


const app = express()


const PORT= config.port;



app.use(express.json());

//routes
// 
app.use("/users", userRoutes);
app.use("/url", authMiddleware, urlRoute);






connectToMongoDB()

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})

