const router = require('express').Router();
const documentUpload = require('../../middlewares/documentUpload');
const hackathonFormData = require('../../models/hackathonForm.model')

router.get('/', (req, res) => {
    hackathonFormData.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error"+err))
});

router.post('/upload',async(req,res)=>{
    await documentUpload(req,res,(error)=>{
        try{
            console.log('requestokok',req.file);
            //console.log('error',error);
            if(error){
                res.status(500).json({
                    ok: false,
                    message: "error in upload :"+error
                });
            }
            else if(req.file === undefined){
                res.status(404).json({
                    ok : false,
                    message:"file not found"
                })
                
            }
            else{
                const newHackathonFormData = new hackathonFormData({
                    name : req.body.name,
                    email : req.body.email,
                    college : req.body.college,
                    github : req.body.github,
                    teamMates : req.body.teamMates,
                    ideaInConcise : req.body.ideaInConcise,
                    documentLink :req.file.location
            
                })
                newHackathonFormData.save()
                    .then(()=> res.status(201).json('Exercise added'))
                    .catch(err => res.status(400).json('Error: '+err))
            }
            
        }catch(error){
            console.error(error);
            res.status(500).json({
            ok: false,
            message: "Something went wrong!",
            error: error.message
            });
        }
        
    });
    
    
})

module.exports = router;