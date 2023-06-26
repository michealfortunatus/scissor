import express from "express";
import * as path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import {config} from "./config/config.js";
import { connectToMongoDB } from "./db/db.js";
import {cache} from "./config/redis.js";
import authMiddleware from "./middleware/authentication.middleware.js";
import {limiter} from "./middleware/rateLimiter.js"
import urlRoute from "./routes/url.route.js";
import userRoutes from "./routes/user.route.js";


const __dirname = path.resolve();


const app = express()


const PORT= config.port;



app.use(express.json());
app.use(limiter);
app.use(cookieParser);


app.set("view engine", "ejs")
app.use(express.static("./frontend/public"))
app.set('views', path.join(__dirname, './frontend/views'))



app.use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }));
//routes
// 
app.use("/", userRoutes);
app.use("/url", authMiddleware, urlRoute);
// app.use("/", urlRoute);




// cache.connect()

connectToMongoDB()

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`)
})

