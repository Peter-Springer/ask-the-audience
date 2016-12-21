var socket = io();
var statusMessage = document.getElementById('status-message');
var connectionCount = document.getElementById('connection-count');
var buttons = document.querySelectorAll('#choices button');
var voteCount = document.querySelectorAll('#vote-count li');
var voteBar = document.querySelectorAll('#vote-count div');

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
  for (var i = 0; i < voteCount.length; i++) {
    voteCount[i].innerText = keys[i] + ':' + ' ' + votes[keys[i]]
    voteBar[i].style.width = votes[keys[i]] * 20 + 'px'
  }

});
