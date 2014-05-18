var mongoose = require('mongoose');
var User = require('./user');

var liftSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  reps: Number,
  sets: Number,
  user: User
  createdAt: { type: Date, default: Date.now }
});

var Lift = mongoose.model('Lift', liftSchema);

// linksSchema.pre('save', function(next) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(this.url);
//   this.code = shasum.digest('hex').slice(0, 5);
//   next();
// });

module.exports = Lift;
