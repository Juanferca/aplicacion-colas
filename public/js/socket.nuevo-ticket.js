// Comando para establecer la conexión

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Usuario Conectado')
});
socket.on('disconnect', () => {
    console.log('Cliente desconectado')
});
// estado actual
socket.on('estadoActual', (resp) => {
    console.log(resp);
    label.text(resp.actual);

})

$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {

        label.text(siguienteTicket);
    });



})