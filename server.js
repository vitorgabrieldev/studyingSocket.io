// configs
const express = require('express');
const path = require('path');
// const { Socket } = require('socket.io');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>
{
    res.render('index.html');
});

let messages = [];

io.on('connection', Socket => 
{
    console.log(`socket conectados: ${Socket.id}`);

    Socket.emit('previousMessages', messages);

    Socket.on('sendMessage', data =>
    {
        messages.push(data);
        Socket.broadcast.emit('receivedMessage', data)
    });
});

server.listen(4000);