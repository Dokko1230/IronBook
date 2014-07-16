IronBook.StatView = Backbone.View.extend({
  className: 'stat',
  template: Handlebars.compile($('#statTemplate').html()),
  initialize: function(){
    this.render();
    // this.collection.fetch();
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));

    var ctx = this.$el.find('.statChart')[0].getContext('2d');

    var completed = this.model.get('completed');
    var dates = _.pluck(completed, 'date');
    var weights = _.pluck(completed, 'weight');
    var data = {
      labels: dates,
      datasets: [
          {
              label: this.model.get('name'),
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: weights
          }
      ]
    };

    var options = {
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      bezierCurve : true,
      bezierCurveTension : 0.4,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 1,
      pointHitDetectionRadius : 20,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true,
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };

    var myLineChart = new Chart(ctx).Line(data, options);
    return this;
  }
});


