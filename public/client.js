var socket = io();
var statusMessage = document.getElementById('status-message');
var connectionCount = document.getElementById('connection-count');
var buttons = document.querySelectorAll('#choices button');
var voteCount = document.querySelectorAll('#vote-count li');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', function (votes) {
  let keys = Object.keys(votes);
    console.log(votes)
    console.log(voteCount);
  for (var i = 0; i < voteCount.length; i++) {
    voteCount[i].innerText = keys[i] + ':' + ' ' + votes[keys[i]]
  }

});
