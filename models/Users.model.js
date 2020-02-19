const { Connection } = require('../configs/Connection');
const mongoose = require('mongoose');
const setSchema = new mongoose.Schema({

    name: {

        type: String,
        unique: true,
        trim: true,
        required: true,
    },

    email: {

        type: String,
        unique: true,
        trim: true,
        required: true
    },

    username: {

        type: String,
        trim: true,
        required: true
    },

    gender: {

        type: String,
        trim: true,
        required: true
    },

    role_id: {

        type: String,
        trim: true,
        ref: 'roles',
        default: null
    },

    password: {

        type: String,
        trim: true,
        required: true
    },

    handphone: {

        type: Number,
        trim: true,
        required: true
    },

    permission: {

        type: String,
        trim: true,
        default: null
    },

    token: {

        type: String,
        trim: true,
        required: true,
        default: null
    },

    auth_token: {

        type: String,
        trim: true,
        default: null
    },

    active_token: {

        type: Date,
        default: null
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

const userSchema = Connection.model('users', setSchema);

module.exports = userSchema;