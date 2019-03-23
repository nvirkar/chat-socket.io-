var socket = io.connect('http://192.168.0.156:4000/');



var chat = document.getElementById('chat')
var handler = document.getElementById('handler')
var message = document.getElementById('message')
var send = document.getElementById('send')
var feedback = document.getElementById('feedback');

$('#send').on('click', function () {
    if (message.value != '') {
        console.log('send clicked')
        socket.emit('message', { message: message.value, handler: handler.value });
        message.value = '';
    }
});

function typing() {
    socket.emit('typing', { handler: handler.value })
}

socket.on('message', (data) => {
    chat.innerHTML = chat.innerHTML + '<div class="data"> <b>' + data.handler + ' : </b>' + data.message;
    $('#chat').animate({ scrollTop: $('#chat').prop("scrollHeight") }, 500);
    feedback.innerHTML = ''
})

socket.on('typing', (data) => {
    feedback.innerHTML = data.handler + " is typing ..."
})