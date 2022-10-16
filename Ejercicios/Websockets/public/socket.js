const socketCliente = io()
socketCliente.on('message', data => console.log(data))