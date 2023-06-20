import {rateLimit} from "express-rate-limit";

const limiter =  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false
})


export {limiter};
