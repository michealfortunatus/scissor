import dotenv from "dotenv"
dotenv.config()
import * as urlService from "../services/url.service.js"
import {nanoid} from "nanoid";

const createUrl = async (req, res) => {
    const base = process.env.BASE;
    const urlId = nanoid(5);
    const body = req.body
    const origUrl = body.url;
    
    try{
        let url = await urlService.getOrigUrl(origUrl);
    
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
            const shortUrl = await urlService.getShortUrl(origUrl);
            
            res.status(201).json({ data: shortUrl });
        }
    } catch(err){
        console.log(err);
      res.status(500).json('Server Error');
    };
   
  };


const getShortUrl= async (req, res) => {
  const urlId = req.params.id;
  
  try{
      const url = await urlService.getUrlById(urlId);
        
      if (!url){
      res.status(404).json("Not found");
      } else{
          const updatedUrl = await urlService.incrementUrlClicks(urlId)
         
          return res.redirect(url.origUrl);
      }
  } catch(err){
      console.log(err);
    res.status(500).json('Server Error');
  };
 
};









 export {createUrl, getShortUrl};