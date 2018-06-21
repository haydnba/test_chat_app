var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('Received New Message: ', message);
  var li = $('<li></li>');
  var sender = message.from;
  li.text(`${sender === 'Admin' ? '' : sender + ': '} ${message.text}`);
  $('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  if ($('[name=message]').val()) {
    var sender = $('[name=user_name]').val() || 'User';
    socket.emit(
      'createMessage',
      {
        from: sender,
        text: $('[name=message]').val()
      },
      function(data) {
        console.log(data);
      }
    );
    $('[name=message]').val('');
  }
});
