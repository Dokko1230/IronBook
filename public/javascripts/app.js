var Lift = Backbone.Model.extend({
  initialize: function() {
  },
  url: function() {
    return '/lift/' + this.get('_id');
  }

});

var LiftView = Backbone.View.extend({
  template: Handlebars.compile($('#liftTemplate').html()),
  className: 'lift',
  initialize: function() {
    this.render();
    this.model.on('change', function() {
      this.render();
    }, this);

    this.$el.draggable({ 
      axis: 'x',
      start: function(event, ui) {
        console.log('started');
      },
      stop: function(event, ui) {
        if($(this).offset().left > this.offsetWidth * .75 ) {
          $(this).fadeOut();
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
      debugger;
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
  }

});

var App = Backbone.Model.extend({

});

var AppView = Backbone.View.extend({

});


$(function() {
  var userName = 'haku';

  $.ajax({
    url: '/lifts',
    type: 'GET',
    success: function(lifts) {
      console.log('success ajax request');
      for(var i = 0; i < lifts.length; i++) {
        var lift = new Lift(lifts[i]);
        var liftView = new LiftView({model: lift});
        $('.lifts .row').append(liftView.$el);
      }
    }
  });

});