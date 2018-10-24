// Comando para establecer la comunicacion.

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});
// Obteer el ultimo ticket
socket.on('estadoActual', function(resp) {
    console.log('Respuesta server: ', resp);
    label.html(resp.actual);
});
$('button').on('click', function() {
    console.log('click');
    // Enviar información
    socket.emit('siguienteTicket', {}, function(resp) {
        console.log('Respuesta server: ', resp);
        label.html(resp.siguiente);
    });

});