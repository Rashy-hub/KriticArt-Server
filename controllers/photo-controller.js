const PhotoModel = require("../models/photo-model");
const mongoose = require("mongoose");

const PhotoController = {
  getByIds: async (req, res) => {
    console.log(req.query);
    const photoArray = req.query.photo;

    let { limit, offset } = req.query;
    limit = parseInt(limit ?? 5);
    offset = parseInt(offset ?? 0);

    // ↓ Dont use this :o
    /*
        let photoArray=[]
        for(let i in req.body)           
            photoArray.push(req.body [i]["photo_id"]);     
        */
    // ↑ Vraiment, faut pas faire ça Rachid !

    //console.log(photoArray)
    //let photoArray=req.body
    if (limit <= 0 || offset < 0) {
      res.sendStatus(400);
    }
    const records = await PhotoModel.find({ _id: { $in: photoArray } });
    if (!records) {
      res.sendStatus(404);
      return;
    }
    console.log(records.length);
    const result = records.slice(offset, limit + offset);

    res.json(result);
  },

  upload: async (req, res) => {
    // const {isFromApi,isPublic,public_api_url}= req.query
    //const { isPublic } = req.query;
    // console.log()
    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    console.log(" SAVING PICTURE ");
    const newphoto = new PhotoModel({
      isPublic: false,
      photo_author: req.user.id,
      photo_desc: req.file.originalname,
      image,
    });
    //save data
    await newphoto.save(function (err) {
      if (err) return console.log(err + " MONGO SAVE FAILED ");
    });
    res.json(newphoto._id);
  },
  getPrivates: async (req, res) => {
    // const records = await PhotoModel.find({ photo_author: req.user.id, isPublic: false });
    let { limit, offset } = req.query;
    const records = await PhotoModel.find({ photo_author: req.user.id, isPublic: false }).skip(offset).limit(limit);
    //console.log(records)
    res.json(records)
  },

  getPublics: async (req, res) => {
    //console.log(req)
    let { limit, offset } = req.query;
    const records = await PhotoModel.find({ isPublic: true }).skip(offset).limit(limit);
    //const photos = records.slice(offset, limit + offset);


    res.json(records)
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
