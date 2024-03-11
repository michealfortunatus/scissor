import { Types } from "mongoose";
import urlModel from "../db/models/url.model.js";
import {cache} from "../config/redis.js"

const createShortUrl = async (urlData) => {
  let newUrls = await urlModel.create(urlData);
  return newUrls;
};

const getOrigUrl= async(origUrl) => {
  let url= await urlModel.findOne({ origUrl});
  return url;
};

const getUrlById= async(urlId) => {
  let url= await urlModel.findOne({ urlId});
  return url;
};

const getShortUrl= async(origUrl) => {
  let shortUrl = await urlModel.findOne({ origUrl }).select({shortUrl: 1, _id:0})
  return shortUrl;
}

const getQRCode = async(urlId) => {
  let QRCode = await urlModel.findOne({ urlId }).select({QRString: 1, _id:0})
  return QRCode;
}

const getallUrlsbyUserId= async(userId, page) => {
  const cacheKey = `urls:${userId}`;

  const urlsPerPage= 20

  const totalRecords = await urlModel.find().count();

  const totalPages = Math.ceil(totalRecords / urlsPerPage);

    

  let urls = await urlModel.find({
    user: new Types.ObjectId(userId),
  }).sort({date: -1, clicks: -1})
    .skip(page * urlsPerPage)
    .limit(urlsPerPage);

  const dataToCache= {urls, totalPages}; 
  cache.redis.set(cacheKey, JSON.stringify(dataToCache));
  return {urls, totalPages};
}


const incrementUrlClicks= async(urlId) => {
  let url = await urlModel.updateOne({ urlId: urlId }, {$inc: { clicks: 1 }}, { new: true });
  return url;
}


export {createShortUrl, getOrigUrl, getUrlById, getShortUrl, getQRCode, getallUrlsbyUserId, incrementUrlClicks};