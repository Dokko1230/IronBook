
IronBook.StatView = Backbone.View.extend({
  className: 'stat',
  template: Handlebars.compile($('#statTemplate').html()),
  initialize: function(){
    this.render();
    // this.collection.fetch();
  },
  render: function() {
    var data = [];
    var completed = this.model.get('completed');
    for(var i = 0; i < completed.length; i++) {
      // debugger;
      data.push({ 
        x: Date.parse(new Date(completed[i].date)),
        y: completed[i].weight
      });
    }
    var graph = new Rickshaw.Graph({
      element: this.$el[0],
      renderer: 'line',
      series: [{
              data: data,
              color: 'steelblue'
      }]
    });
    // var time = new Rickshaw.Fixtures.Time();
    // var seconds = time.unit('second');
    // var xAxis = new Rickshaw.Graph.Axis.Time({
    //   graph: graph,
    //   timeUnit: seconds
    // });
    var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );
    var yAxis = new Rickshaw.Graph.Axis.Y({
      graph: graph
    });
    graph.render();

  }
});
