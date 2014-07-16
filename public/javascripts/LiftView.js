
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
      },
      stop: function(event, ui) {
        if($(this).offset().left > this.offsetWidth * .75 ) {
          $(this).fadeOut();
          that.finishLift();
        } else if($(this).offset().left < this.offsetWidth * - 1 * .5 ) {
          $(this).fadeOut();
          that.saveForLater();
        } else {
          $(this).animate({
            left: '0'
          }, 750);

        }
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
    },
    'click .left-rep': function() {
      this.decrementReps();
      this.render();
    },
    'click .right-rep': function() {
      this.incrementReps();
      this.render();
    },
    'click .left-set': function() {
      this.decrementSets();
      this.render();
    },
    'click .right-set': function() {
      this.incrementSets();
      this.render();
    },
    'click .left-weight': function() {
      this.decrementWeight();
      this.render();
    },
    'click .right-weight': function() {
      this.incrementWeight();
      this.render();
    },
  },
  decrementSets: function() {
    this.model.set('currentSets', this.model.get('currentSets') - 1);
  },
  incrementSets: function() {
    this.model.set('currentSets', this.model.get('currentSets') + 1);
  },
  decrementReps: function() {
    this.model.set('currentReps', this.model.get('currentReps') - 1);
  },
  incrementReps: function() {
    this.model.set('currentReps', this.model.get('currentReps') + 1);
  },
  decrementWeight: function() {
    this.model.set('currentWeight', this.model.get('currentWeight') - 5);
  },
  incrementWeight: function() {
    this.model.set('currentWeight', this.model.get('currentWeight') + 5);
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

