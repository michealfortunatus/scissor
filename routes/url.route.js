import { Router } from "express";
import {getHome,createUrl, getShortUrl, getAllUrlsByUser} from "../controllers/url.controller.js";
// import { getShortUrlCache } from "../middleware/getShortUrlCache.middleware.js";
// import { getUrlsByUserCache } from "../middleware/getUrlsByUserCache.middleware.js";
// import createUrlValidator from "../middleware/validators/urlValidator.js";

const urlRoute = Router()

urlRoute.get("/", getHome);
// urlRoute.post("/", createUrlValidator, createUrl);
//urlRoute.get("/:id", getShortUrlCache,getShortUrl);
urlRoute.get("/users", getAllUrlsByUser);

export default urlRoute

// , getUrlsByUserCache




