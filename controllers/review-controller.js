const ReviewModel = require('../models/review-model');



const ReviewController = {
    
    getComments: async (req, res) => {

        let { limit, offset} = req.query;
        const photo_id = req.params.photoId;

        limit = parseInt(limit ?? 5);
        offset = parseInt(offset ?? 0);

        if (limit <= 0 || offset < 0) {
            res.sendStatus(400);
        }

        const result = await ReviewModel.findOne()
            .where('photo_id').equals(photo_id);

        const reviews = result.reviews.slice(offset, limit + offset);

        //console.log(reviews)    
        res.json(reviews);

    },

    getRatings: async (req, res) => {

        const photo_id = req.params.photoId;
        const result=await ReviewModel.aggregate([
            {$unwind:"$ratings"},
            {$group : {_id:"$photo_id",avgRating : {  $avg : "$ratings.rating" }}}
            //{$group : {$eq:["$photo_id",photo_id],avgRating : {  $avg : "$ratings.rating" }}}
        ])
        //console.log(result)
        res.json(result)
       

    },
    


    postComment: async (req, res) => {
        // verifier la validité de req.body et retourner un code 400 
        // si invalide (yup)
        let  photo_id = req.params.photoId;        
        const result = await ReviewModel.findOne()
            .where('photo_id').equals(photo_id);
        
        if(!result)
        {
            const newreview  = new ReviewModel({photo_id:photo_id,reviews:[{review_author:req.user.id,comment:req.body.comment}],ratings:[]});
            console.log(" NEW  REVIEW HAS BEEN CREATED with comment")
              //save data
            await newreview.save(function (err) {                
                if (err) 
                    return (console.log(err + " MONGO  REVIEW SAVE FAILED "))
                else
            console.log(" COMMENT HAS BEEN SAVED ")
           
          });

          res.json(newreview._id);
        }     
       
        else
        {
            console.log("REVIEW HAS BEEN UPDATED")
            const nextreview={review_author:req.user.id,comment:req.body.comment}                   
            const filter = { photo_id: photo_id };            
            const update ={$push: { reviews: nextreview }}         
            await ReviewModel.findOneAndUpdate(filter, update);                
            res.json(result._id);
        }

    },

    postRating: async (req, res) => {
        let  photo_id = req.params.photoId;  
        let {rating} = req.query;  
        
         const result = await ReviewModel.findOne()
            .where('photo_id').equals(photo_id); 
         //( { ratings: { "$in" : ["sushi"]} })
      

            if(!result)
            {
                const newreview  = new ReviewModel({photo_id:photo_id,reviews:[],ratings:[{rating_author:req.user.id,rating:rating}]});
                console.log(" NEW  REVIEW HAS BEEN CREATED : with rating ")
                  //save data
                await newreview.save(function (err) {                
                    if (err) 
                        return (console.log(err + " MONGO  REVIEW SAVE FAILED "))
                    else
                console.log(" RATING HAS BEEN SAVED ")
               
              });
    
              res.json(newreview._id);
            }     
           
            else
            {
                console.log("REVIEW HAS BEEN UPDATED")
                    
                //check si l'utilisateur actuelle a déja voté pour cette photo
                const test = await ReviewModel.findOne().where('ratings.rating_author').equals(req.user.id)
               // console.log(test)
                if(!test)
                {
                    console.log("FIRST RATING FROM THIS USER")
                    const nextrating={rating_author:req.user.id,rating:rating}                   
                    const filter = { photo_id: photo_id};            
                    const update ={$push:{ ratings: nextrating }}  
                    await ReviewModel.findOneAndUpdate(filter, update);              
                    res.json(result._id);
                }
                else{
                    console.log("UPDATE RATING FROM THIS USER")
                    await ReviewModel.updateOne(
                        {photo_id:photo_id,'ratings.rating_author':req.user.id},
                        {$set:{'ratings.$.rating':rating}})
                        res.json(result._id);
                }
                //si non alors je push 
                //si oui alors je update en remplaçant (pas de push)                                                           
               
            }

    },

      delete: async (req, res) => {
      
        const result = await ReviewModel.findByIdAndDelete(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.json(result);
    }

};

module.exports = ReviewController;