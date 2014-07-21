
IronBook.LiftView = Backbone.View.extend({
  template: Handlebars.compile($('#liftTemplate').html()),
  className: 'lift',
  initialize: function() {
    var that = this;

    /** Handlers for the model **/
    this.model.on('change', function() {
      this.render();
    }, this);

    this.model.on('finishLift', function() {
      this.finishLift();
      $(this.$el).fadeOut();
    }, this);


    var sets = new IronBook.LiftSets(null, this.model.get('currentSets'));
    sets.on('finished', function() {
      this.finishLift();
    }, this);

    this.model.set('sets', sets);

    var randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

    this.$el.css('background-color', randomColor);

    this.$el.draggable({ 
      axis: 'x',
      start: function(event, ui) {
      },
      stop: function(event, ui) {
        if($(this).offset().left > this.offsetWidth * .75 ) {
          that.finishLift();
        } else if($(this).offset().left < this.offsetWidth * - 1 * .5 ) {
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
    this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    var setsView = new IronBook.LiftSetsView({ collection: this.model.get('sets') });

    this.$el.append(setsView.$el);
  },
  events: {
    'click button': function() {
      this.prHandler();
    },
    'click .sets i': function(event) {
      this.toggleSet(event.target);
    },
    'click .left-rep': function() {
      this.decrementReps();
      this.editHandler();
    },
    'click .right-rep': function() {
      this.incrementReps();
      this.editHandler();
    },
    'click .left-set': function() {
      this.decrementSets();
      this.editHandler();
    },
    'click .right-set': function() {
      this.incrementSets();
      this.editHandler();
    },
    'click .left-weight': function() {
      this.decrementWeight();
      this.editHandler();
    },
    'click .right-weight': function() {
      this.incrementWeight();
      this.editHandler();
    },
  },
  decrementSets: function() {
    this.model.get('sets').pop();
    this.model.set('currentSets', this.model.get('currentSets') - 1);
  },
  incrementSets: function() {
    this.model.get('sets').push(new IronBook.LiftSet());
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
  editHandler: function() {
    var that = this;
    Backbone.sync('update', this.model, {
      url: that.model.editUrl()
    });
  },
  finishLift: function() {
    $(this.$el).fadeOut();
    var that = this;
    Backbone.sync('update', this.model, {
      url: that.model.finishUrl(),
      success: function() {
        console.log('finished syncing!');
      }
    });
  },
  saveForLater: function() {
    $(this.$el).fadeOut();
    var that = this;
    Backbone.sync('update', this.model, {
      url: that.model.saveForLater(),
      success: function() {
        console.log('Maybe tomorrow...');
      }
    });
  }
});

