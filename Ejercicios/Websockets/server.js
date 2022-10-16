// hacer turno dermatologo
// hacer ejercicio pug y ejs

const ex = require('express')
const {Server} = require('socket.io') //trae la clase Server de socket.io
const app = ex()
const server = app.listen(8080, () => {
    console.log('andando wacho')
})
const io = new Server(server) //enlaza el socket con el servidor creado
app.use(ex.static(__dirname + '/public'))
io.on('connection', socket => { //socket del lado del servidor
    console.log('cliente conectado', socket.id)
    socket.emit('message', 'se ha conectado exitosamente')
})
