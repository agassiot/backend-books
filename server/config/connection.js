const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_DB , {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

module.exports = mongoose.connection;
