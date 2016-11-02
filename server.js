const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index'));
app.get('/chatScreen', (req, res) => res.render('chatScreen'));


io.sockets.on('connection', (socket) => {
  socket.on('sendchat', (pseudo, message) => {
    io.sockets.emit('updatechat', pseudo, message);
  });
});

server.listen(process.env.PORT || 3000);
