const PhotoModel = require('../models/photo-model');
var ImgModel=require('../models/photo-model')
const {isValidObjectId } = require('mongoose');
const mongoose=require('mongoose')



const PhotoController = {
    get: async (req, res) => {

        let { limit, offset } = req.query;

        limit = limit ?? 5;
        offset = offset ?? 0;

        if (limit <= 0 || offset < 0) {
            res.sendStatus(400);
        }

        const result = await PhotoModel.find()
            .skip(offset)
            .limit(limit);
        res.json(result);
    },

    getById: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        const result = await PhotoModel.findById(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.json(result);
    },

    insert: async (req, res) => {
        // verifier la validité de req.body et retourner un code 400 
        // si invalide (yup)
        
        const result = await PhotoModel.create(req.body);

        res.json(result);
    },

    update: async (req, res) => {
        // verifier la validité de req.body et retourner un code 400 
        // si invalide (yup)
       
     /*    if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        } */
        var fs = require('fs');
        mypath="C:\\Users\\Local_user.DESKTOP-0S2DMSC\\Desktop\\KriticArt\\server\\public\\image\\"
        // + "/uploads/" + req.file.filename
        const {isFromApi}= req.query

        // const obj = {
        //     img: {
        //         data: req.file,//fs.readFileSync(mypath+req.file.filename)), // NOPE :D
        //         contentType: "image/png"
        //     }
        // }

        const image = {
            data: req.file.buffer,        // Si save in Mongo => Config multer :p
            contentType:req.file.mimetype
        }
        
        // { new: true } => result est modifié 
        console.log(" SAVING PICTURE ")
        const newphoto = new PhotoModel({isFromApi, photo_author:req.user.id,image});
        
        //save data
        await newphoto.save(function (err) {
            
            if (err) 
            return (console.log(err + " MONGO SAVE FAILED "))
            // saved!
          });

        res.json(newphoto._id);
    },

    delete: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }
        const result = await PhotoModel.findByIdAndDelete(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.json(result);
    }

};

module.exports = PhotoController;