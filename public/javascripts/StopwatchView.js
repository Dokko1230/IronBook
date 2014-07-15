
IronBook.StopwatchView = Backbone.View.extend({
  className: 'stopwatch',
  template: Handlebars.compile($('#stopwatchTemplate').html()),
  initialize: function(){
    this.render();
  },
  render: function() {
    this.$el.empty();
    this.$el.html(this.template());
    return this;
  }
});
