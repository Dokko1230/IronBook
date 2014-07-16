var Lift = Backbone.Model.extend({
  initialize: function() {
  },
  url: function() {
    return '/lift/' + this.get('_id');
  },
  finishUrl: function() {
    return '/updateDay/';
  },
  saveForLater: function() {
    return '/saveForLater/';
  },
  edit: function() {
    return '/edit/';
  }

});
