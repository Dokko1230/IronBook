var Lift = Backbone.Model.extend({

});

var App = Backbone.Model.extend({

});

var AppView = Backbone.View.extend({

});

var LiftView = Backbone.View.extend({

});

$(function() {
  var userName = 'haku';

  $.ajax({
    url: '/lifts',
    type: 'GET',
    success: function(lifts) {
      console.log('success ajax request');
      console.dir(lifts);
      var source = $('#liftTemplate').html();
      var template = Handlebars.compile(source);
      for(var i = 0; i < lifts.length; i++) {
        console.log(lifts[i]);
        $('.lifts .row').append(template(lifts[i]));
      }
    }
  });

  $('lift button').on('click', function() {
    $.ajax({
      url: '/pr',
      type: 'POST',
      data: {
        name: 'stuff'
      },
      success: function() {
        console.log('yay');
      }
    });
  });

});