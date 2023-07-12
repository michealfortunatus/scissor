import { Router } from "express";
import {createUrl, getAllUrlsByUser} from "../controllers/url.controller.js";
//import { getUrlsByUserCache } from "../middleware/getUrlsByUserCache.middleware.js";
import createUrlValidator from "../middleware/validators/urlValidator.js";

const urlRoute = Router()



urlRoute.route("/create")
    .post(createUrlValidator, createUrl);

urlRoute.route("/by-user").get(getAllUrlsByUser);




export default urlRoute





