'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

var keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.Object,
        required:true,
        ref: 'Shop'
    },
    privateKey:{
        type:String,
    },
    publicKey:{
        type:String,
    },
    refreshToken:{
        type:Array,
        default: []
    },
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);