import express from "express";
import {config} from "./config/config.js";

const app = express()

import { connectToMongoDB } from "./db/db.js";

import urlRoute from "./routes/url.route.js";

const PORT= config.port;

// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());

//routes
app.use("/url", urlRoute);






connectToMongoDB()

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})

