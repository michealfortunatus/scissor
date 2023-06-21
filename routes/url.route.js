import { Router } from "express";
import {createUrl, getShortUrl, getAllUrlsByUser} from "../controllers/url.controller.js";
import { getShortUrlCache } from "../middleware/getShortUrlCache.middleware.js";
import { getUrlsByUserCache } from "../middleware/getUrlsByUserCache.middleware.js";
import createUrlValidator from "../middleware/validators/urlValidator.js";

const urlRoute = Router()

urlRoute.post("/", createUrlValidator, createUrl);
urlRoute.get("/:id", getShortUrlCache,getShortUrl);
urlRoute.get("/", getUrlsByUserCache, getAllUrlsByUser);

export default urlRoute


