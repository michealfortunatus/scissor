import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import * as userService from "../services/user.service.js"


const getRegister= async(req, res)=>{
    res.render("register");
};

const getLogin= async(req, res)=>{
  res.render("login");
};


const postRegister = async (req, res) => {
  const userRequest = req.body;
  // console.log(userRequest)
  // check if a user already exist with the email
  const exist = await userService.userExist(userRequest.email);
  if (!exist) {

    const newUser = await userService.create({ ...userRequest});
    // res.status(200).json(newUser);
    res.redirect("/login")
  } else {
    res.status(400).json({ message: "User already exist" });
  }
};



const postLogin = async (req, res) => {
  const body = req.body;
  // check if the user is in the db
  const user = await userService.getUserByEmail(body.email);
  
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  // check if password matches
  const isCorrectPassword = await bcrypt.compare(body.password, user.password);
  if (!isCorrectPassword) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  // give a token
  var token = jwt.sign({user}, config.jwt.secret, {expiresIn: config.jwt.ttl});
  
  res.cookie("token", token, {
    httpOnly: true
})
  // res.status(200).json({ token, message: "success" });
  res.redirect("/by-user")

};

export { getRegister, getLogin, postRegister, postLogin };