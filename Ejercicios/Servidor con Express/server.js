const ex = require('express')
const app = ex()

const Container = require('./container.js')
const products = new Container('Productos', [])

app.get('/', (req, res, next) => {
  res.send('Accedé a /productos o a /productoRandom')
})
app.get('/productos', (req, res, next) => {
  res.send(products.objects)
  
})
app.get('/productoRandom', (req, res, next) => {
  const i = Math.floor(Math.random()*products.objects.length)
  res.send(products.objects[i])
})

app.listen(8080, () => {
  console.log('Server is ON')
})