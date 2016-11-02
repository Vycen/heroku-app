var bgColors = ['#fea3aa', '#f8b88b', '#faf884', '#baed91', '#b2cefe', '#f2a2e8'];
var bgColor = 5;

function escaped(s) {
  return $('<div></div>').html(s).html();
}

var socket = io.connect('/');

// listener, whenever the server emits 'updatechat', this updates the chat body
socket.on('updatechat', function (username, data) {
  if(bgColor == 5) {
    bgColor = 0;
  }
  else {
    bgColor += 1;
  }
  $('#conversation').append('<div class="messages" style="background-color:' + bgColors[bgColor] + '")><div>' + escaped(data) + '</div><div class="signature">- ' + escaped(username) + '</div></div>');
});


// on load of page
$(function () {
    // when the client hits ENTER on their keyboard
    /*$('#data').keypress(function (e) {
      if (e.which == 13) {
        var message = $('#data').val();
        $('#data').val('');
        // tell server to execute 'sendchat' and send along one parameter
        socket.emit('sendchat', message);
      }
    });*/
});
