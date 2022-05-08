const GalleryModel = require('../models/gallery-model');

const { ErrorResponse } = require('../response-schemas/error-schema');
const mongoose = require("mongoose");



const GalleryController = {
    getById: async (req, res) => {        
         
        //let {gallery_id}=req.params.gallery_id;
        const isValidId = mongoose.Types.ObjectId.isValid(req.params.gallery_id);    
              
        const gallery=await GalleryModel.findById(req.params.gallery_id)
        if (!isValidId) {
            res.status(404).send("Link Not Found - invalid id");
          }
            
        if (!gallery) {
                return res.status(422).json(new ErrorResponse('Gallery not found', 422));
            }
      res.json(gallery);

    
    },
    getByUser: async (req, res) => {  

        const galleries=await GalleryModel.find({gallery_author:req.user.id})
        res.json(galleries)
    },

    createGallery: async (req, res) => {
        let { isPublic} = req.query;      
        let {title,description}=req.body
        const newrgallery = new GalleryModel({isPublic:isPublic,isPinned:false,gallery_author:req.user.id,gallery_photos:[],galleryTitle:title,galleryDesc:description});   
        
        await newrgallery.save(function (err) {                
            if (err) 
                return (console.log(err + " MONGO  GALLERY SAVE FAILED "))
            else
                console.log(" GALLERY HAS BEEN SAVED/CREATED ")
      });
        
        res.json(newrgallery._id);
        
    },
    updateGallery: async (req, res) => {
        
        let {gallery_id}=req.params.gallery_id;
        let {photo_id} = req.query;   
         
        console.log("ADD PHOTO ID TO GALLERY")
        const nextphoto={_id:photo_id}                   
        const filter = gallery_id;            
        const update ={$push:{ gallery_photos: nextphoto }}  
        const result=await GalleryModel.findOneAndUpdate(filter, update);              
        
        res.json(result._id);
          
  
    },
    updatePinned: async (req, res) => {

        //ici on push la photo id à la gallerie par défaut nommé Pinned
        //

    },


    delete: async (req, res) => {
      
        const result = await GalleryModel.findByIdAndDelete(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        
    }

};

module.exports = GalleryController;