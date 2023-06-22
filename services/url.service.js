import { Types } from "mongoose";
import urlModel from "../db/models/url.model.js";

const createShortUrl = async (urlData) => {
  const newUrls = await urlModel.create(urlData);
  return newUrls;
};

const getOrigUrl= async(origUrl) => {
  let url= await urlModel.findOne({ origUrl}).populate("user");
  return url;
};

const getUrlById= async(urlId) => {
  let url= await urlModel.findOne({ urlId}).populate("user");
  return url;
};

const getShortUrl= async(origUrl) => {
  let shortUrl = await urlModel.findOne({ origUrl }).select({shortUrl: 1, _id:0})
  return shortUrl;
}

const getallUrlsbyUserId= async(userId) => {
  const urlsPerPage= 20

  const totalRecords = await urlModel.find().count();

  const totalPages = Math.ceil(totalRecords / urlsPerPage);
    
  const page= req.query.page || 0;

  let urls = await urlModel.find({
    user: new Types.ObjectId(userId),
  }).sort({date: -1, clicks: -1})
    .skip(page * urlsPerPage)
    .limit(urlsPerPage);
  return {urls, totalPages};
}


const incrementUrlClicks= async(urlId) => {
  let url = await urlModel.updateOne({ urlId: urlId }, {$inc: { clicks: 1 }}, { new: true });
  return url;
}


export {createShortUrl, getOrigUrl, getUrlById, getShortUrl, getallUrlsbyUserId, incrementUrlClicks};