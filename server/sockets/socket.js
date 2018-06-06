const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');



const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente)

    });

    // emitir evento estado actual

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimo4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: `El escritorio es necesario`
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar o notificar cambios en los ultimos 4

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimo4()
        });
    });

});