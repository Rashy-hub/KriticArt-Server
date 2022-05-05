const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const ReviewSchema = Schema({

    //_id: mongoose.Schema.Types.ObjectId,
    photo_id:{ type: Schema.Types.ObjectId, ref: 'photo' ,unique:true,required:true},

    reviews:[
        {  
            review_author:  { type: Schema.Types.ObjectId, ref: 'users' }  ,
            comment:String            
         
   
        },   
    ],

    ratings:[
        {
            rating_author:{ type: Schema.Types.ObjectId, ref: 'users' },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                validate: {validator: Number.isInteger}
            },
        }
    ]   
 
    
  
})


const ReviewModel = mongoose.model('review', ReviewSchema);
    
    
module.exports = ReviewModel;