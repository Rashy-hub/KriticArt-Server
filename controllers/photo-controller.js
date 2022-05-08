const PhotoModel = require('../models/photo-model');
const mongoose = require("mongoose");


const PhotoController = {
    getByIds:async (req,res)=>{

        let { limit, offset} = req.query;
        limit = parseInt(limit ?? 5);
        offset = parseInt(offset ?? 0);       
        
        let photoArray=[]
        for(let i in req.body)           
            photoArray.push(req.body [i]["photo_id"]);     
            
        //console.log(photoArray)     
        //let photoArray=req.body    
        if (limit <= 0 || offset < 0) {
            res.sendStatus(400);
        }
        const records = await PhotoModel.find({ '_id': { $in: photoArray } });      
        if (!records) {
            res.sendStatus(404);
            return;
        } 
        console.log(records)
        const result = records.slice(offset, limit + offset);
      
        res.json(result);

    },

    upload: async (req, res) => {
                 
       // const {isFromApi,isPublic,public_api_url}= req.query   
       const {isPublic}= req.query   
        const image = {
            data: req.file.buffer,        
            contentType:req.file.mimetype
        }             
        console.log(" SAVING PICTURE ")
        const newphoto = new PhotoModel({isPublic:isPublic, photo_author:req.user.id,image});        
        //save data
        await newphoto.save(function (err) {            
            if (err) 
            return (console.log(err + " MONGO SAVE FAILED "))           
          });
        res.json(newphoto._id);
    },


    delete: async (req, res) => {
       
        const result = await PhotoModel.findByIdAndDelete(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.json(result);
    },
   

};

module.exports = PhotoController;