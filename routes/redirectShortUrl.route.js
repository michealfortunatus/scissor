import { Router } from "express";
import {redirectShortUrl} from "../controllers/url.controller.js";

const redirectRoute = Router()



redirectRoute.route("/by-user/:id")
    .get(redirectShortUrl);



export default redirectRoute






