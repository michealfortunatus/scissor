import { Router } from "express";
import {createUrl, getShortUrl, getAllUrlsByUser} from "../controllers/url.controller.js";
import createUrlValidator from "../middleware/validators/urlValidator.js";

const urlRoute = Router()

urlRoute.post("/", createUrlValidator, createUrl);
urlRoute.get("/:id", getShortUrl);
urlRoute.get("/", getAllUrlsByUser);

export default urlRoute


