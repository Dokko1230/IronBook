
IronBook.createLiftView = Backbone.View.extend({
  template: Handlebars.compile($('#createTemplate').html()),
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  }

});