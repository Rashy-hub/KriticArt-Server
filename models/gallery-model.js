const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const GallerySchema = Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    isPublic:Boolean,
    isPinned:Boolean,
    gallery_author:{ type: Schema.Types.ObjectId, ref: 'users' },
    gallery_photos:[{ type: Schema.Types.ObjectId, ref: 'photo' }],  
    galleryTitle:String,    
    galleryDesc:String
        
     
})


const GalleryModel = mongoose.model('gallery', GallerySchema);
    
    
module.exports = GalleryModel;