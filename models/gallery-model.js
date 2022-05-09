const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const GallerySchema = Schema(

{
    isPublic:Boolean,
    isPinned:Boolean,    
    galleryTitle:String,    
    galleryDesc:String,
    gallery_author:{ type: Schema.Types.ObjectId, ref: 'users' },
    gallery_photos:[{ type: Schema.Types.ObjectId, ref: 'photo' }],  
}

)


const GalleryModel = mongoose.model('gallery', GallerySchema);
    
    
module.exports = GalleryModel;