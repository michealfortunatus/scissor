// import Cache from "../config/redis.js"
//Under the getShortUrl, after defining  your urlID
const cacheKey = `urls:${urlId}` //creating a unique cache key
const cachedUrl = await Cache.redis.get(cacheKey);
//Cache hit
if(cachedUrl){
    return res.status(201).json({status: true, url:JSON.parse(cachedUrl)})//url will be the variable you used to store your db findings

} //here this means no longer going to the database to get data
 //Cache miss
 //first your code for looking to database, then
 Cache.redis.set(cacheKey, JSON.stringify(url));


 //to get all orders
