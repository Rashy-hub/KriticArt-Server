const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const PhotoSchema = Schema({

    isRandom: Boolean,
    photo_author:{ type: Schema.Types.ObjectId, ref: 'users' },
    comments:[{ type: Schema.Types.ObjectId, ref: 'review' }]
   
  
})


const PhotoModel = mongoose.model('photo', PhotoSchema);
    
    
module.exports = PhotoModel;