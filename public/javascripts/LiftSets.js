IronBook.LiftSets = Backbone.Collection.extend({
  model: Lift,
  initialize: function(count) {
    for(var i = 0; i < count; i++) {
      this.push(new IronBook.LiftSet());
    }
  },
  isFinished: function() {
    
  }
});