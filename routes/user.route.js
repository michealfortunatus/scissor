import { Router } from "express";
import {getLogin, postLogin, getRegister, postRegister } from "../controllers/user.controller.js";
import {registerValidator, loginValidator}  from "../middleware/validators/userValidator.js";

const userRoute = Router();

  
userRoute.route("/login")
    .get(getLogin)
    .post(loginValidator, postLogin)


userRoute.route("/register")
.get(getRegister)
.post(registerValidator, postRegister);


export default userRoute;

