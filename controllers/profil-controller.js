const UserModel=require('../models/users-model')


const ProfilController = {

    update: async (req, res) => {
         
        //const {isFromApi}= req.query   
        const image = {
            data: req.file.buffer,        
            contentType:req.file.mimetype
        }     
        
        console.log(" SAVING PROFIL ")
        const newphoto = new PhotoModel({isFromApi, photo_author:req.user.id,image});
        
        //save data
        await newphoto.save(function (err) {
            
            if (err) 
            return (console.log(err + " MONGO SAVE FAILED "))
           
          });

        res.json(newphoto._id);
    }

}

module.exports = ProfilController;




