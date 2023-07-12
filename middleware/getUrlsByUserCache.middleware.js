import {cache} from "../config/redis.js";

const getUrlsByUserCache = async (req, res, next) => {
  const  userId  = req.user.user._id;

  const cacheKey = `urls:${userId}`;

  const cachedData = await cache.redis.get(cacheKey);
  const parsedData = JSON.parse(cachedData);


  if (cachedData) {
      // Cache hit
     return res.render("ownerUrls", { ownerUrls: parsedData.urls, pages: parsedData.totalPages})
  }

  // Cache miss
  next();
}

export {getUrlsByUserCache};