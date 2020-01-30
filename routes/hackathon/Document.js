const router = require('express').Router();
const Team = require('../../models/hackathonForm.model')
const User = require('../../models/User')
const { celebrate, errors } = require('celebrate')
const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)


const regDetails = {
    body: {
        teamName: Joi.string().required(),
        teamMatesEmail: Joi.array().items(Joi.string()),
        ideaInConcise: Joi.string().required(),
        documentLink: Joi.string().required(),
        teamMatesDetail: Joi.array().items(Joi.objectId()),
        eventId: Joi.string().required()
    }
}

router.get('/viewTeam', (req, res) => {
    Team.find()
        .populate('leaderDetails', 'name email college year regNo role')
        .populate('teamMatesDetail', 'name email college year regNo role')
        .then(teams => { res.json(teams) })
        .catch(err => res.status(400).json("Error" + err))
})

router.post('/addTeam', celebrate(regDetails), async (req, res) => {
    try {
        req.body.leaderDetails = req.user._id;
        const emails = req.body.teamMatesEmail;
        const TeamMatesId = emails.map(async email => {
            return User.findOne({ email }).then((user) => {
                console.log(user);
                if (user !== null || user != undefined) {
                    return user._id
                } else {
                    // res.status(400).json({
                    //     ok: false,
                    //     message: "Team mates email not registered!"
                    // })
                    console.log("I'm reaching the error block");
                    throw Error("This is error thrown by me")
                    return;
                }
            })
        });
        Promise.all(TeamMatesId).then(async (data) => {
            try {

                console.log("Found data in promise", data);
                data.forEach(user => {
                    if (user === undefined || user === null) {
                        res.status(400).json({
                            ok: false,
                            message: "Teammates email not found"
                        })
                    }
                });
                req.body.teamMatesDetail = data

                const pairId = req.body.eventId + req.user._id
                const d = { ...req.body };
                const newTeam = Team({
                    pairId,
                    teamName: req.body.teamName,
                    ideaInConcise: req.body.ideaInConcise,
                    documentLink: req.body.documentLink,
                    teamMatesDetail: req.body.teamMatesDetail,
                    eventId: req.body.eventId,
                    leaderDetails: req.body.leaderDetails
                })
                console.log("req.body.teamMatesDetail", req.body.teamMatesDetail)
                const ret = await newTeam.save()
                res.status(201).json({
                    ok: true,
                    message: "team added",
                    team: ret
                });
            } catch (error) {
                console.log(error);
                res.status(400).json({
                    ok: false,
                    message: "Already Registered for the hackathon"
                })
            }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            ok: false,
            message: "Team data unable to save"
        })
    }
})
router.post(errors());

module.exports = router;
