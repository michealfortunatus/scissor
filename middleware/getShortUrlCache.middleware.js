import {cache} from "../config/redis.js";

const getShortUrlCache = async (req, res, next) => {
  const { urlId } = req.params.id;

  const cacheKey = `urls:${urlId}`;

  const cachedUrl = await cache.redis.get(cacheKey);

  if (cachedUrl) {
      // Cache hit
      return res.json({ status: true, order: JSON.parse(cachedUrl) })
  }

  // Cache miss
  next();
}

export {getShortUrlCache};