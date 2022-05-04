const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const GallerySchema = Schema({

    _id: mongoose.Schema.Types.ObjectId,
    isPublic:Boolean,
    gallery_author:{ type: Schema.Types.ObjectId, ref: 'users' },
    gallery_photos:[{ type: Schema.Types.ObjectId, ref: 'photo' }],
    isFavori:Boolean,
    galleryTitle:String,
        
     
})


const GalleryModel = mongoose.model('review', GallerySchema);
    
    
module.exports = GalleryModel;