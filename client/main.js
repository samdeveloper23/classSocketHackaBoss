//vamos a hacer que el cliente su pueda conectar a nuestro servidor socket y que reconozca que alguien se a conectado.
//en la ruta podemos buscar nuestra ip publica para así ver la apricacion fuera de nuestro dispositivo, todo equipo que este conectado a su wifi podrá ver la app.
const socket = io.connect('http://192.168.1.44:6677', { 'forceNew': true }); /*parametro para que la conexon de fuerce: 'forceNew': true */

//preparamos en la parte cliente para recoger la emision del servidor.
socket.on('messages', (data) => { /* el parametro data recoge los datos emitidos por el servidor */

    //hacemos un log para ver los datos que trae por defecto.
    console.log(data);
    render(data);//no olbidar pasar 'data' como parametro.
})

//creamos nuestra funcion pasando 'data' como parametro.
const render = (data) => {
    //creamos la variable html haciendo referencia a donde vamos a renderizar.
    //usamos el metodo 'map' para data dandole de valores: message e index(importante ponerlo aun que no se use).
    let html = data.map((message, index) => {
        //retornamos el html con el destructurin.
        return (`
            <div class='message'>
                <strong>${message.nick}:</strong>
                <p>${message.text}</p>
            </div>
        `);
        //(OPCIONAL: uso el metodo join para separar los dos componetes)
    }).join(' ');

    //seleccionamos por ID el div que tenemos en el index.html y renderizamos el contenido de la variable html.
    const div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

//creamos la funcion donde recivimos el evento.
function addMessage(e) {
    //declaramos una variable para recuperar los datos de la emision.
    const message = {
        nick: document.getElementById('nick').value,
        text: document.getElementById('text').value,
    }
    console.log(message);

    document.getElementById('text').value = '';
    //despues de que el usuario incorpores su nombre lo ocultamos con css.
    document.getElementById('nick').style.display = 'none';

    //ahora hacemos que recoja el servidor el mensaje emitido desde el cliente por lo tanto el servidor se encargá de recibirlo.
    socket.emit('add-message', message);
    //no retornamos ya que solo queremos que sea recogido por el servidor.
    return false;
}
