const mongoose = require('mongoose');
require('mongoose-type-url');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const hackathonSchema = new Schema({
    teamName: {
        type: String,
        required: true
    },
    leaderDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    teamMatesEmail: [{
        type: mongoose.SchemaTypes.Email,
        unique: true
    }],
    ideaInConcise: {
        type: String,
        required: true
    },
    documentLink: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },
    teamMatesDetail:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',

    }],
    eventTitle:{
        type: String,
        required: true
    }
},{timestamps : true})

module.exports = mongoose.model('hackathonFormData',hackathonSchema)