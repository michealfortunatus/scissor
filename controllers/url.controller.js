import dotenv from "dotenv"
dotenv.config()
import urlModel from "../db/models/url.model.js";
import * as urlService from "../services/url.service.js"
import {nanoid} from "nanoid";

const createUrl = async (req, res) => {
    const base = process.env.BASE;
    const urlId = nanoid(5);
    const body = req.body
    const origUrl = body.url;
    try{
        let url = await urlModel.findOne({ origUrl });
    
        if (!url){
        const shortUrl = `${base}/${urlId}`;

        const urlData = await urlService.createShortUrl({
            urlId,
            origUrl,
          shortUrl,
          date: new Date(),
        });
        res.status(201).json({ data: urlData });
        } else{
            let shortUrl = await urlModel.findOne({ origUrl }).select({shortUrl: 1, _id:0})
            res.status(201).json({ data: shortUrl });
        }
    } catch(err){
        console.log(err);
      res.status(500).json('Server Error');
    };
   
  };


 export {createUrl};