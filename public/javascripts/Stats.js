IronBook.Stats = Backbone.Collection.extend({
  model: Stat,
  url: '/getStats'
});