IronBook.LiftSetView = Backbone.View.extend({
  initalize: function() {
    this.model.on('change', function() {
      this.render();
    });

  },
  render: function() {
    return this;
  }
});