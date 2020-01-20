const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const hackathonSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    email:{
        type:String,
        required:true,
    },
    college:{
        type:String,
        required:true
    },
    github:{
        type : mongoose.SchemaTypes.Url,
        required : true
    },
    teamMates:[{
        type:String  // Array of String for multiple team mates
    }],
    ideaInConcise :{
        type : String,
        required:true
    },
    documentLink :{
        type : mongoose.SchemaTypes.Url,
        required:true
    }

},{timestamps : true})

module.exports = mongoose.model('hackathonFormData',hackathonSchema)