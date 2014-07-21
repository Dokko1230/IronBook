IronBook.LiftSet = Backbone.Model.extend({
  initialize: function() {
    this.set('completed', false);
  },
  toggle: function() {
    this.set('completed', !this.get('completed'));
  }
});