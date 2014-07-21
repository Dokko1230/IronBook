IronBook.LiftSetsView = Backbone.View.extend({
  className: 'liftSets',
  initialize: function() {
    this.addAll();
  },
  render: function() {
    // this.$el.empty();
    return this;
  },
  addAll: function() {
    this.collection.forEach(this.addOne, this);
  },
  addOne: function(item) {
    var view = new IronBook.LiftSetView({ model: item });
    this.$el.append(view.$el);
  }
});