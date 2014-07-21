IronBook.LiftSets = Backbone.Collection.extend({
  initialize: function(ignore, count) {
    for(var i = 0; i < count; i++) {
      this.push(new IronBook.LiftSet());
    }
    this.on('change', function() {
      if(this.isFinished()) {
        this.trigger('finished');
      }
    }, this);
  },
  isFinished: function() {
    return this.models.every(function(item) {
      return item.get('completed');
    });
  }
});