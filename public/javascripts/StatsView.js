
IronBook.StatsView = Backbone.View.extend({
  className: 'stats',
  template: Handlebars.compile($('#statsTemplate').html()),
  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },
  render: function() {
    this.$el.empty();
    this.$el.html(this.template());
    this.$el.find('.calendar').clndr();
    return this;
  },
  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new IronBook.StatView({ model: item });
    this.$el.append(view.$el);
  }
});
