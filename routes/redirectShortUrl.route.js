import { Router } from "express";
import {redirectShortUrl} from "../controllers/url.controller.js";
import { redirectShortUrlCache } from "../middleware/redirectShortUrlCache.middleware.js";

const redirectRoute = Router()



redirectRoute.route("/by-user/:id")
    .get(redirectShortUrlCache, redirectShortUrl);



export default redirectRoute






