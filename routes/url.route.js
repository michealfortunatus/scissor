import { Router } from "express";
import {createUrl} from "../controllers/url.controller.js";
import createUrlValidator from "../middleware/urlValidator.js";

const urlRoute = Router()

urlRoute.post("/", createUrlValidator, createUrl);

export default urlRoute


