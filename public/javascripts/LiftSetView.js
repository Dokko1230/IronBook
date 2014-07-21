IronBook.LiftSetView = Backbone.View.extend({
  className: 'liftSet',
  template: Handlebars.compile($('#liftSetTemplate').html()),
  initialize: function() {
    this.render();
    this.model.on('change', function() {
      this.render();
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});