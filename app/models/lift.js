var mongoose = require('mongoose');

var liftSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  reps: Number,
  sets: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
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
