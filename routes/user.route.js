import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import {registerValidator, loginValidator}  from "../middleware/validators/userValidator.js";

const userRoutes = Router();

userRoutes.post("/register", registerValidator, register);
userRoutes.post("/login", loginValidator, login);


export default userRoutes;