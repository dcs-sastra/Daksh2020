const router = require('express').Router();
const Team = require('../../models/hackathonForm.model')
const User = require('../../models/User')
const {celebrate,errors} = require('celebrate')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)


const regDetails = {
    body:{
        teamName: Joi.string().required(),
        teamMatesEmail: Joi.array().items(Joi.string()),
        ideaInConcise: Joi.string().required(),
        documentLink: Joi.string().required(),
        teamMatesDetail: Joi.array().items(Joi.objectId()),
        eventTitle: Joi.string().required()
    }
}

router.get('/viewTeam',(req,res)=>{
    Team.find()
    .populate('leaderDetails','name email college year regNo role')
    .populate('teamMatesDetail','name email college year regNo role')
    .then(teams =>{res.json(teams)})
    .catch(err => res.status(400).json("Error"+err))
})

router.post('/addTeam',celebrate(regDetails),async(req,res)=>{
    try{
        req.body.leaderDetails = req.user._id;
        const emails = req.body.teamMatesEmail;
        const TeamMatesId = emails.map(async email => {
                return  User.findOne({email}).then((user) =>  user._id)            
        });
         Promise.all(TeamMatesId).then(async(data) => {
            console.log("Found data in promise", data);
           req.body.teamMatesDetail = data
            const newTeam = Team({
            ...req.body
            })
           console.log("req.body.teamMatesDetail",req.body.teamMatesDetail)
            const ret = newTeam.save()
            res.status(201).json({ 
                ok: true,
                message: "team added",
                user:   ret
            });
        })
    }catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            message: "Team data unable to save"
        })
    }
})
router.post(errors());

module.exports = router;