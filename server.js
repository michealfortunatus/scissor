import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {config} from "./config/config.js";
import { connectToMongoDB } from "./db/db.js";
import {cache} from "./config/redis.js";
import authMiddleware from "./middleware/authentication.middleware.js";
import {limiter} from "./middleware/rateLimiter.js";
import homeRoute from "./routes/home.route.js";
import qrRoute from "./routes/qrCode.route.js";
import redirectRoute from "./routes/redirectShortUrl.route.js";
import urlRoute from "./routes/url.route.js";
import userRoute from "./routes/user.route.js";



const __dirname = path.resolve();


const app = express()


const PORT= config.port;



app.use(express.json());
app.use(limiter);

app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));


app.set("view engine", "ejs")
app.use(express.static("public"))
app.set('views', path.join(__dirname, '/views'))


app.use(cookieParser());

//routes
app.use("/", homeRoute);
app.use("/", qrRoute)
app.use("/", redirectRoute)
app.use("/", userRoute);
app.use("/", authMiddleware, urlRoute);





cache.connect()

connectToMongoDB()

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})

