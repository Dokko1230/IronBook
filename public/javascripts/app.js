var randomColors = [
  'blueviolet',
  'cadeblue',
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
    'click li a.create': 'renderCreateView'
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

  updateNav: function(routeName){
    this.$el.find('.navigation li a')
      .removeClass('selected')
      .filter('.' + routeName)
      .addClass('selected');
  }

});

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
  }

});

IronBook.Lifts = Backbone.Collection.extend({
  model: Lift,
  url: '/lifts'
});

IronBook.LiftsView = Backbone.View.extend({
  className: 'lifts',
  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },
  render: function() {
    this.$el.empty();
    return this;
  },
  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new IronBook.LiftView({ model: item });
    this.$el.append(view.$el);
  }
});

IronBook.LiftView = Backbone.View.extend({
  template: Handlebars.compile($('#liftTemplate').html()),
  className: 'lift',
  initialize: function() {
    var that = this;
    this.render();
    this.model.on('change', function() {
      this.render();
    }, this);

    var randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    this.$el.css('background-color', randomColor);

    this.$el.draggable({ 
      axis: 'x',
      start: function(event, ui) {
        console.log('started');
      },
      stop: function(event, ui) {
        if($(this).offset().left > this.offsetWidth * .75 ) {
          $(this).fadeOut();
          console.log('finishing lift');
          that.finishLift();
        } else if($(this).offset().left < this.offsetWidth * - 1 * .5 ) {
          $(this).fadeOut();
          that.saveForLater();
        } else {
          // debugger;
          $(this).animate({
            left: '0'
          }, 750);

        }
        console.log('stopped');
      }
     });
    this.$el.on('dragcreate', function(event, ui) {
      console.log(ui.position);
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
  },
  events: {
    'click button': function() {
      this.prHandler();
    }
  },
  prHandler: function() {
    var that = this;
    console.log('syncing');
    Backbone.sync('update', this.model, {
      url: that.model.url(),
      success: function() {
        console.log('synced!');
      }
    });
  },
  finishLift: function() {
    var that = this;
    Backbone.sync('update', this.model, {
      url: that.model.finishUrl(),
      success: function() {
        console.log('finished syncing!');
      }
    });
  },
  saveForLater: function() {
    var that = this;
    Backbone.sync('update', this.model, {
      url: that.model.saveForLater(),
      success: function() {
        console.log('Maybe tomorrow...');
      }
    });
  }

});

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

IronBook.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    '':       'index',
    'create': 'create'

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
  }
});



$(function() {

  new IronBook();

});