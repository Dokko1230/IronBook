var randomColors = [
  'blueviolet',
  'cadetblue',
  'chocolate',
  'brown',
  'darkblue',
  'darkcyan',
  'darkred',
  'powderblue',
  'crimson'
];

window.IronBook = Backbone.View.extend({
  template: Handlebars.compile($('#appTemplate').html()),
  events: {
    'click li a.index':  'renderIndexView',
    'click li a.create': 'renderCreateView',
    'click li a.stats': 'renderStatsView'
  },

  initialize: function(){
    $('body').append(this.render().$el);

    this.router = new IronBook.Router({ 
      el: this.$el.find('#container')
    });

    this.router.on('route', this.updateNav, this);

    Backbone.history.start({ pushState: true });
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    this.router.navigate('/', { trigger: true });
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    this.router.navigate('/create', { trigger: true });
  },

  renderStatsView: function(e){
    e && e.preventDefault();
    this.router.navigate('/stats', { trigger: true });
  },

  updateNav: function(routeName){
    this.$el.find('.navigation li a')
      .removeClass('selected')
      .filter('.' + routeName)
      .addClass('selected');
  }

});

IronBook.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    '':       'index',
    'create': 'create',
    'stats': 'stats'

  },

  swapView: function(view){
    this.$el.html(view.render().$el);
  },

  index: function(){
    var lifts = new IronBook.Lifts();
    var liftsView = new IronBook.LiftsView({ collection: lifts });
    this.swapView(liftsView);
  },

  create: function(){
    this.swapView(new IronBook.createLiftView());
  },
  stats: function() {
    var stats = new IronBook.Stats();
    this.swapView(new IronBook.StatsView({ collection: stats }));
  }
});

$(function() {
  new IronBook();
});