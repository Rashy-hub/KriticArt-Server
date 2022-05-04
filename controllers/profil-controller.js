const UserModel=require('../models/users-model')


const ProfilController = {

    update: async (req, res) => {
         

        const {bio}= req.query  
        //const {isFromApi}= req.query   

        const image = {
            data: req.file.buffer.toString('base64'),        
            contentType:req.file.mimetype
        }     
        
        console.log(" SAVING PROFIL ")

       

    const filter = { _id: req.user.id };
    const update = { bio: bio ,image:image };
    console.log(update);

    // `doc` is the document _before_ `update` was applied
        let updated =await UserModel.findOneAndUpdate(filter, update,{
            returnOriginal: false
        })
                   
        //save data
      
        res.json(updated);
        //res.json(" update sucess ");
    }

}

module.exports = ProfilController;




