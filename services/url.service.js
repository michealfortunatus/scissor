import urlModel from "../db/models/url.model.js";

const createShortUrl = async (urlData) => {
  const newUrls = await urlModel.create(urlData);
  return newUrls;
};


export {createShortUrl};