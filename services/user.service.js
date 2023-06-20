import { userModel } from "../db/models/user.model.js";

const userExist = async (email) => {
  //check the db if a user exist
  const user = await userModel.findOne({ email });
  return !!user;
};

const create = async (user) => {
  //create user
  const newUser = await userModel.create(user);
  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await userModel.findOne({ email });
  return user;
};

export { userExist, create, getUserByEmail };