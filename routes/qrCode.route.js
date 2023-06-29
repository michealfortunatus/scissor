import { Router } from "express";
import {getQRCode} from "../controllers/url.controller.js";

const qrRoute = Router()



qrRoute.route("/ScanQRCode/:id")
    .get(getQRCode);



export default qrRoute






