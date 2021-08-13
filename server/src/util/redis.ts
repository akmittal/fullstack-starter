import {promisify} from "util";

import redis from "redis";


 const redisClient = redis.createClient();

redisClient.on("error", (error) => {
  console.error(error);
});
export const getAsync = promisify(redisClient.get).bind(redisClient);
export const incrAsync = promisify(redisClient.incr).bind(redisClient);
export const expireAsync = promisify(redisClient.expire).bind(redisClient);




