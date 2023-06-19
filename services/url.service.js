import urlModel from "../db/models/url.model.js";

const createShortUrl = async (urlData) => {
  const newUrls = await urlModel.create(urlData);
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

const incrementUrlClicks= async(urlId) => {
  let url = await urlModel.updateOne({ urlId: urlId }, {$inc: { clicks: 1 }}, { new: true });
  return url;
}


export {createShortUrl, getOrigUrl, getUrlById, getShortUrl, incrementUrlClicks};