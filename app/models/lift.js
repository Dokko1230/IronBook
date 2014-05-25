var mongoose = require('mongoose');

var liftSchema = new mongoose.Schema({
  name: String,
  currentWeight: Number,
  currentReps: Number,
  currentSets: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  completed: [{
    date: String,
    weight: Number,
    reps: Number,
    sets: Number
  }],
  todo: { type: Boolean, default: false },
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
