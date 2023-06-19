import { Router } from "express";
import {createUrl, getShortUrl} from "../controllers/url.controller.js";
import createUrlValidator from "../middleware/urlValidator.js";

const urlRoute = Router()

urlRoute.post("/", createUrlValidator, createUrl);
urlRoute.get("/:id", getShortUrl);

export default urlRoute


