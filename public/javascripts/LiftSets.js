IronBook.LiftSets = Backbone.Collection.extend({
  model: IronBook.LiftSet,
  initialize: function(ignore, count) {
    for(var i = 0; i < count; i++) {
      this.push(new IronBook.LiftSet());
    }
  },
  isFinished: function() {

  }
});