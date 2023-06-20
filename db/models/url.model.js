import {model, Schema, Types} from "mongoose";

const urlSchema = new Schema({
  urlId: {
    type: String,
    required: true,
  },
  user: { type: Types.ObjectId, ref: "User", required: true },
  origUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const urlModel = model("Url", urlSchema); 

export default urlModel;
