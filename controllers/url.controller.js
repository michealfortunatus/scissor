
import {config} from "../config/config.js";
import {cache} from "../config/redis.js";

import moment from "moment";
import * as urlService from "../services/url.service.js";
import {generateQR} from "../utils/generateQRCode.js";
import {nanoid} from "nanoid";

import * as path from "path"



const __dirname = path.resolve();


const getHome = async(req, res)=>{
  res.render("index");
};

const getQRCode = async(req, res)=>{
  const urlId = req.params.id;
  
  try{
      const QRString = await urlService.getQRCode(urlId);
      const QRCode= QRString.QRString
      console.log({ "qrcode": QRCode})

 
      if (!QRCode){
      res.status(404).json('Not found');
      } else{
        // res.status(201).json({ data: urls, pages: totalPages })
        res.render("qrCode", { qrcode: QRCode});
     }
  } catch(err){
      console.log(err);
    res.status(500).json('Server Error');
  };
 
 
};


const createUrl = async (req, res) => {
    const base = config.base;
    const urlId = nanoid(5);
    const body = req.body
    const origUrl = body.url;
    
    try{
        let url = await urlService.getOrigUrl(origUrl);
    
        if (!url){
        const shortUrl = `${req.headers.referer}/${urlId}`;
        const QRString = await generateQR(shortUrl);
        

        const urlData = await urlService.createShortUrl({
            urlId,
            origUrl,
          shortUrl,
          QRString,
          user: req.user.user._id,
          date: moment().format("DD-MMM-YYYY"),
        });
      
        const cacheKey = `url:${urlId}`;
    
        cache.redis.set(cacheKey, JSON.stringify(urlData));
        res.redirect("/by-user");
        // res.status(201).json({ data: urlData });

        } else{
            const shortUrl = await urlService.getShortUrl(origUrl);
            
            res.status(201).json({ data: shortUrl });
        }
    } catch(err){
        console.log(err);
      res.status(500).json('Server Error');
    };
   
  };





const redirectShortUrl= async (req, res) => {
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







 export {createUrl, getAllUrlsByUser, getHome, getQRCode, redirectShortUrl};