const mongoose = require('mongoose');

const clusterUrl = process.env.MONGO_URL;

mongoose.connect(clusterUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'srinidhibackendtest2' // Specify the database name here
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connecting to the database'));
db.once('open', function () {
  console.log("Connected to the database:: MongoDB");
});

module.exports = db;
