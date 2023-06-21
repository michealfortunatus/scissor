import {cache} from "../config/redis.js";

const getUrlsByUserCache = async (req, res, next) => {
  const { userId } = req.user.user._id;

  const cacheKey = `urls:${userId}`;

  const cachedUrl = await cache.redis.get(cacheKey);

  if (cachedUrl) {
      // Cache hit
      return res.json({ status: true, order: JSON.parse(cachedUrl) })
  }

  // Cache miss
  next();
}

export {getUrlsByUserCache};