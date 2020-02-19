const { Connection } = require('../configs/Connection');
const mongoose = require('mongoose');
const setSchema = new mongoose.Schema({

    name: {

        type: String,
        trim: true,
        required: true,
    },

    permission: {

        type: String,
        trim: true,
        required: true,
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

const roleSchema = Connection.model('roles', setSchema);

module.exports = roleSchema;