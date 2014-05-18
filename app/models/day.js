var mongoose = require('mongoose');

var daySchema = new mongoose.Schema({
  date: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  lifts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lift'}],
  createdAt: { type: Date, default: Date.now }
});

var Day = mongoose.model('Day', daySchema);

// linksSchema.pre('save', function(next) {
//   var shasum = crypto.createHash('sha1');
//   shasum.update(this.url);
//   this.code = shasum.digest('hex').slice(0, 5);
//   next();
// });

module.exports = Day;
