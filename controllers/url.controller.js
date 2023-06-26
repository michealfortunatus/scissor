
import {config} from "../config/config.js";

import * as urlService from "../services/url.service.js"
import {nanoid} from "nanoid";


const getHome= async(req, res)=>{
  res.render("index");
};


const createUrl = async (req, res) => {
    const base = config.base;
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
          user: req.user.user._id,
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


const getAllUrlsByUser = async (req, res) => {
  
  const userId = req.user.user._id;
  const page= req.query.page || 0;
 
  
  try{
    const {urls, totalPages} = await urlService.getallUrlsbyUserId(userId, page);
      if (!urls){
      res.status(404).json('No urls available yet');
      } else{
        // res.status(201).json({ data: urls, pages: totalPages })
    res.render("ownerUrls", { ownerUrls: urls, pages: totalPages});
      }
  } catch(err){
      console.log(err);
    res.status(500).json('Server Error');
  };
 
};






 export {createUrl, getShortUrl, getAllUrlsByUser, getHome};