var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_ENV || 'mongodb://localhost/test');
