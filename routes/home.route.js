import { Router } from "express";
import {getHome} from "../controllers/url.controller.js";

const homeRoute = Router()



homeRoute.route("/")
    .get(getHome);



export default homeRoute






