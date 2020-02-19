const { Connection } = require('../configs/Connection');
const autoIncrement = require('mongoose-plugin-autoinc');
const mongoose = require('mongoose');
const setSchema = new mongoose.Schema({

    credits_id: {

        type: Number,
        trim: true,
        required: true,
        ref: 'credits'
    },

    lecture_id: {

        type: String,
        trim: true,
        required: true,
        ref: 'users'
    },

    name: {

        type: String,
        trim: true,
        required: true,
    },

    code: {

        type: String,
        unique: true,
        trim: true,
        required: true,
    },

    semester: {

        type: Number,
        trim: true,
        required: true
    },

    sks: {

        type: Number,
        trim: true,
        required: true
    },

    created_at: {

        type: Date,
        default: null
    },

    updated_at: {

        type: Date,
        default: null
    }

});

setSchema.plugin(autoIncrement.plugin, {

    model: 'subjects',
    field: 'subjectId',
    startAt: 1
});

const subjectsSchema = Connection.model('subjects', setSchema);

module.exports = subjectsSchema;