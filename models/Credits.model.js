const { Connection } = require('../configs/Connection');
const autoIncrement = require('mongoose-plugin-autoinc');
const mongoose = require('mongoose');
const setSchema = new mongoose.Schema({

    subject_id: {

        type: Number,
        unique: true,
        trim: true,
        required: true,
        ref: 'subjects'
    },

    user_id: {

        type: String,
        unique: true,
        trim: true,
        required: true,
        ref: 'users'
    },

    score_uas: {

        type: Number,
        trim: true,
        required: true
    },

    score_uts: {

        type: Number,
        trim: true,
        required: true
    },

    score_final: {

        type: Number,
        trim: true,
        required: true
    },

    create_at: {

        type: Date,
        default: null
    },

    update_at: {

        type: Date,
        default: null
    }

});

setSchema.plugin(autoIncrement.plugin, {

    model: 'credits',
    field: 'creditsId',
    startAt: 1,
});

const roleSchema = Connection.model('credits', setSchema);

module.exports = roleSchema;