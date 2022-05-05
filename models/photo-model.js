const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const PhotoSchema = Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    isFromApi: Boolean,
    isPublic:Boolean,
    public_api_url:String,
    photo_author:{ type: Schema.Types.ObjectId, ref: 'users' },
    image:{
        data:Buffer,
        contentType:String
    },
    globalrating:Number
})


const PhotoModel = mongoose.model('photo', PhotoSchema);
    
    
module.exports = PhotoModel;