
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
    this.calendar = window.calendar = this.$el.find('.calendar').clndr();
    return this;
  },
  addAll: function(){
    this.collection.forEach(this.registerToCalendar, this);
    this.collection.forEach(this.addOne, this);
  },
  registerToCalendar: function(item){
    // https://github.com/kylestetz/CLNDR
    var events = [];
    _.forEach(item.get('completed'), function(completed, i) {
      //    highlight that date
      //    adding will rerender
      //HACK FOR DATES MUST FIX LATERS LOL
      var splitted = completed.date.split('-');
      splitted[1] = parseInt(splitted[1]) + 1;
      completed.date = splitted.join('-');
      events.push(completed);
    });
    this.calendar.addEvents(events);
  },

  addOne: function(item){
    if(item.get('completed').length) {
      var view = new IronBook.StatView({ model: item });
      this.$el.append(view.$el);
    }
  }
});
