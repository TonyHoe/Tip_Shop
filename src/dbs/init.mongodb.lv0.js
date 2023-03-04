'use strict';
const mongoose = require('mongoose');

const connectString = `mongodb://127.0.0.1:27017/Tip_shop`;
mongoose.connect(connectString)
.then(_ => { console.log('Connect Mongodb Success'); })
.catch(err => { console.log('Connect Mongodb Error', err); }); 

//dev
if (1 === 1) {
    mongoose.set('debug', true);
    mongoose.set('debug', {colors: true});
}

module.exports = mongoose;