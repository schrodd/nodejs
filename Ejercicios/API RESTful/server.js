const express = require('express')
const routes = require('./routes')
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', routes)

app.listen(port, () => console.log(`Server listening on port ${port}`))