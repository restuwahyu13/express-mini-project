const mongoose = require('mongoose');
// class Connetion {
//     static MongooseConnect() {

//         const connection = mongoose.createConnection(process.env.MONGOO_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
//         return connection;
//     }
// }

const Connection = mongoose.createConnection(process.env.MONGOO_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
module.exports = { Connection };