//###############################################################################
//######################## HACK A BOSS and SOCIAL DOBY ##########################
//###############################################################################

//######################## Socket.io - Introducción #############################


//#################### PRIMERA PARTE ######################                             1

//asignamos a la variable express el modulo 'express' este nos viene de la carpeta node_modules.
const express = require('express');

//llamamos a la funcion express asignandola a la valriable app.
const app = express();

//ahora cargamos la variable server con 'http' que tiene de forma nativa node y le pasamos con el metodo .Server la valiable app (No confundor la variable server con el metodo Server).
const server = require('http').Server(app);

//para que socket funcione de forma basica cargamos la libreria en la variable io (podeis llamarla como más comodos estéis) y le pasamos el servidor (la variable)
const io = require('socket.io')(server);

//no olbidemos 'cors'.
const cors = require('cors');
//se incorpora justo antes de la entrada de nuestro servidor.
app.use(cors());

//################## QUINTA PARTE ##########################                            5
//preparamos una vista donde se cargue el formulario y se vea el chat usando el mideware de express para cargar una vista estática
//asignamos la carpeta 'client'(en otros proyectos la conocereis como public) donde alojaremos los archivos estaticos (HTML, CSS)
app.use(express.static('client'));
//***llegados a este paso nos dirigimos a crear un index.html en la carpeta client.***(luego volvemos).

//################### TERCERA PARTE ########################                            3

//utilizamos la variable de app previamente cargada con expres para la creación de rutas.
app.get('/hi-hack-a-boss', (req, res) => {

    //cuando nos hagan una peticion get les devolvemos (res = respuesta) un mensaje.
    res.status(200).send('Hola a todos los participantes de este lindo taller impartido gracias a HACK A BOSS');
    //otra manera de respuesta seria:
    /*res.send({
        status: 200,
        message: Hola a todos los participantes de este taller impartido gracias a HACK A BOSS,
    })*/
})

//#################### SEXTA PARTE ################################                     6

//definimos un Array donde se almacenarán los mensajes dado que este proyecto carece de DB. Los mensajes iran en objetos JSON.
const message = [{
    id: 1,
    text: 'Bienvenid@ al chat con socket y nodejs del taller impartido por sam machado',
    nick: 'SamVirtual',
}];
//primero abrimos una conexión al socket.io, utilizamos la variable io junto con el metodo on (con el metodo on nos permite lanzar evenos)
//el primer evento a lanzar será el 'connection' que se lo madaremos a los clientes. Este metodo detecta a los clientes cuando se conectan.
io.on('connection', (socket) => {  /*llamamos a socket para obtener las ropiedades de sus metodos*/

    //cuando un cliente se conecta lo mostrará el log diseñado para ello, utilizaremos la ip del cliente para identificarlo.
    console.log(`El cliente con IP: ${socket.handshake.address} se a conectato`);

    //  SEGUNDA PARTE* (despues de preparar el Array de mensajes) emision del Array de mensajes.
    //emitimos el mensaje a todos los clientes.
    socket.emit('messages', message);
    // TERCERA PARTE* (cuando terminemos de preparar el main.js para que recoja el servidor el evento).
    // ahora que el mensaje esta guardado en el servidor ahora emitimos a todos los clientes que esten conectados.
    socket.on('add-message', (data) => {
        //para ello usaremos la funcion push en el Array 'message' que teniamos preparada antes (linea 45) pasandole como parametro 'data'.
        message.push(data);
        //emitimos a todos los clientes el Array de mensajes actualizado.
        io.emit('messages', message);
        //si deseamos ver el ultimo mensaje enviado podemos declarar una variable y usando 'length' podemos hacer 'log' del yultimo mensaje emitido. 
        const lastMessage = message[message.length - 1];
        console.log('Último mensaje:', lastMessage);
    });
});


//##################### SEGUNDA PARTE ######################                            2

//ponemos a la escucha el servidor.
server.listen(6677, () => {
    console.log('Servidor en correrto funcionamiento');
})
//socket ya esta en correcto funcionamiento en el eveno de escucha dado que la carguemos en io.