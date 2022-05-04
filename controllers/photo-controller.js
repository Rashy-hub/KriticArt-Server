const PhotoModel = require('../models/photo-model');
const {isValidObjectId } = require('mongoose');

const PhotoController = {

    upload: async (req, res) => {
         
        const {isFromApi}= req.query   
        const image = {
            data: req.file.buffer,        
            contentType:req.file.mimetype
        }     
        
        console.log(" SAVING PICTURE ")
        const newphoto = new PhotoModel({isFromApi, photo_author:req.user.id,image});
        
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
    }

};

module.exports = PhotoController;