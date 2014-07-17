IronBook.StatView = Backbone.View.extend({
  className: 'stat',
  template: Handlebars.compile($('#statTemplate').html()),
  initialize: function(){
    this.render();
    setTimeout(function() {
      this.draw();
    }.bind(this), 0);
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));

    return this;
  },
  draw: function() {
    var completed = this.model.get('completed');
    var dates = _.pluck(completed, 'date');
    var weights = _.pluck(completed, 'weight');

    var chart = c3.generate({
      bindto: this.$el.find('.chart')[0],
      size: {
        height: 225
      },
      padding: {
        left: 50
      },
      grid: {
        x: {
          show: true
        },
        y: {
          show: true
        }
      },
      transition: {
        duration: 500
      },
      data: {
        x: 'x',
        columns: [
          // ['x', '2013-10-31', '2013-11-30', '2013-12-31', '2014-01-31', '2014-02-28'],
          ['x'].concat(dates),
          [this.model.get('name')].concat(weights)
        ]
      },
      axis : {
        x : {
          type : 'timeseries',
          tick: {
            fit: true
          }
        }
      }
    });
  }
});


