import { Router } from "express";
import {createUrl, getShortUrl, getAllUrlsByUser} from "../controllers/url.controller.js";
import { getShortUrlCache } from "../middleware/getShortUrlCache.middleware.js";
import { getUrlsByUserCache } from "../middleware/getUrlsByUserCache.middleware.js";
import createUrlValidator from "../middleware/validators/urlValidator.js";

const urlRoute = Router()



urlRoute.route("/create")
    .post(createUrlValidator, createUrl);

urlRoute.route("/by-user").get(getUrlsByUserCache, getAllUrlsByUser);


urlRoute.route("/by-user/:id").get(getShortUrlCache, getShortUrl);


export default urlRoute





