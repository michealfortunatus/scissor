import { Router } from "express";
import {getLogin, postLogin, getRegister, postRegister } from "../controllers/user.controller.js";
import {registerValidator, loginValidator}  from "../middleware/validators/userValidator.js";

const userRoutes = Router();
userRoutes.get("/register", getRegister);
  
userRoutes.get("/login", getLogin);
userRoutes.post("/register",  registerValidator, postRegister);
userRoutes.post("/login", loginValidator, postLogin);


export default userRoutes;

