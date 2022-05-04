const ReviewModel = require('../models/review-model');
const { isValidObjectId } = require('mongoose');


const ReviewController = {
    getAll: async (req, res) => {

        let { limit, offset ,photo_id} = req.query;

        limit = limit ?? 5;
        offset = offset ?? 0;

        if (limit <= 0 || offset < 0) {
            res.sendStatus(400);
        }

        const result = await ReviewModel.find()
            .$where('photo_id').equals(photo_id)
            .skip(offset)
            .limit(limit);
        console.log(result)    
        res.json(result);


/*      exemple :   Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost'). */
    },



    post: async (req, res) => {
        // verifier la validité de req.body et retourner un code 400 
        // si invalide (yup)
        let { photo_id,rating} = req.query;
      
        
        const result = await ReviewModel.find()
            .where('photo_id').equals(photo_id);
            //console.log(result)
       
        if(!result)
        {
            const newreview  = new ReviewModel({photo_id:photo_id,reviews:[{review_author:req.user.id,comment:req.body.comment,rating:rating}]});
            console.log(" NEW  REVIEW HAS BEEN CREATED")
              //save data
          await newreview.save(function (err) {
            
            if (err) 
            return (console.log(err + " MONGO  REVIEW SAVE FAILED "))
            else
            console.log(" REVIEW HAS BEEN SAVED ")
           
          });

          res.json(newreview._id);
        }     
       
        else{
            const nextreview={review_author:req.user.id,comment:req.body.comment,rating:rating}
            //console.log(result)
            result[0].reviews.push(nextreview)
            const appendReview=result
            

            const filter = { photo_id: photo_id };
            const update = { reviews: appendReview };
            console.log(update.reviews)

            await ReviewModel.findOneAndUpdate(filter, update.reviews);

              
            res.json(result._id);
        }

        
       
    },

    update: async (req, res) => {
        // verifier la validité de req.body et retourner un code 400 
        // si invalide (yup)

        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }

        // { new: true } => result est modifié 
        const result = await ReviewModel
            .findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!result) {
            res.sendStatus(404);
            return;
        }

        res.json(result);
    },

    delete: async (req, res) => {
        if (!isValidObjectId(req.params.id)) {
            res.sendStatus(404);
            return;
        }
        const result = await ReviewModel.findByIdAndDelete(req.params.id);
        if (!result) {
            res.sendStatus(404);
            return;
        }
        res.json(result);
    }

};

module.exports = ReviewController;