const { Connection } = require('../configs/Connection');
const mongoose = require('mongoose');
const setSchema = new mongoose.Schema({

    username: {

        type: String,
        trim: true,
        required: true,
    },

    email: {

        type: String,
        unique: true,
        trim: true,
        required: true,
    },

    token: {

        type: String,
        unique: true,
        trim: true,
        required: true
    },

    newPass: {

        type: String,
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

const resetPassSchema = Connection.model('resetpass', setSchema);

module.exports = resetPassSchema;