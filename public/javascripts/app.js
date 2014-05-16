
$(function() {
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

});