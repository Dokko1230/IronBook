IronBook.LiftSetsView = Backbone.View.extend({

  className: 'liftSets',
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.empty();
    this.addAll();
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