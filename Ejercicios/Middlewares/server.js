const express = require('express')
const app = express()

app.listen(8080, () => console.log('Server listening'))

// Middleware a nivel de aplicación, se ejecuta antes de cualquier petición
app.use((req, res, next) => {
    console.log('Middleware de aplicación ejecutado')
    next()
})

// Rutas
app.get('/', (req, res) => {
    console.log('Peticion recibida')
    res.send('Respuesta')
})

// Middleware a nivel de ruta
const verificarRol = (req, res, next) => {
    if (false) { // Reemplazar true con verificación de si es admin o no
        console.log('Acceso otorgado')
        next()
    } else {
        console.log('Acceso denegado')
        res.send('No tiene permisos para acceder a esta ruta')
    }
}
app.get('/admin', verificarRol, (req, res) => {
    res.send('Bienvenido, Admin')
})