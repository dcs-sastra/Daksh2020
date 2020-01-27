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
    ideaInConcise: {
        type: String,
        required: true
    },
    documentLink: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },
    teamMatesDetail: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    eventId: {
        type: String,
        required: true
    },
    pairId: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const hackSchema = mongoose.model('hackathonFormData', hackathonSchema)

hackSchema.init();

module.exports = hackSchema;
