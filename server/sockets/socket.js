const { io } = require('../server');
const { TicketCotrol } = require('../classes/ticket-control');

const ticketControl = new TicketCotrol();


io.on('connection', (client) => {


    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback({
            siguiente: siguiente
        });
        //client.broadcast.emit('siguienteTicket', data);
    });
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es obligatorio'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimos4() });
    });
});