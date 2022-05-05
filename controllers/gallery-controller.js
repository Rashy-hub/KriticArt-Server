const GalleryModel = require('../models/gallery-model');



const GalleryController = {
    getById: async (req, res) => {
        
        let { gallery_id} = req.query;
        const result = await GalleryModel.findOne()
            .where('gallery_id').equals(photo_id)      
        console.log(result)    
        res.json(result);

    },

    create: async (req, res) => {

        const newrgallery = new GalleryModel({});    
        
        res.json(newrgallery);
        
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