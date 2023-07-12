import {cache} from "../config/redis.js";
import * as urlService from "../services/url.service.js";

const redirectShortUrlCache = async (req, res, next) => {
  
  const urlId = req.params.id;

  const cacheKey = `url:${urlId}`;

  const cachedUrl = await cache.redis.get(cacheKey);

  if (cachedUrl) {
      // Cache hit
      await urlService.incrementUrlClicks(urlId)
      const parsedUrl= JSON.parse(cachedUrl)
      return res.redirect(parsedUrl.origUrl)
      
  }

  // Cache miss
  next();
}

export {redirectShortUrlCache};