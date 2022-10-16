const express = require('express')
const app = express()
// const handlebars = require('express-handlebars')
const path = require('path')
const port = 8080

app.use(express.json()) // Permite interpretar JSON como objetos
app.use(express.urlencoded({extended: true})) // Permite interpretar URLs como objetos
const folderViews = path.join(__dirname, 'views') // Permite que la ruta sea estable si se ejecuta en otra pc
app.use(express.static('./public')) // Sirve archivos estaticos
// app.engine('handlebars', handlebars.engine()) // 1. Define motor de plantillas
app.set('views', folderViews) // 2. Ubica carpeta de templates
app.set('view engine', 'ejs') // 3. Define el motor a usar

const products = [
    {
        title: "Hamburguesa de la casa",
        id: 1,
        price: "200",
        thumbnail: "https://cdn.lorem.space/images/burger/.cache/150x150/erik-odiin-F_xGk7V0Xbc-unsplash.jpg"
    },
    {
        title: "Hamburguesa especial",
        id: 2,
        price: "300",
        thumbnail: "https://cdn.lorem.space/images/burger/.cache/150x150/thanos-pal-Djs02AtkOm4-unsplash.jpg"
    },
    {
        title: "Hamburguesa King",
        id: 3,
        price: "500",
        thumbnail: "https://cdn.lorem.space/images/burger/.cache/150x150/amirali-mirhashemian-Tqr2yaJvksM-unsplash.jpg"
    }
]
const err = { error: 'producto no encontrado' }

app.listen(port, () => console.log(`Server listening on port ${port}`)) // Inicializa el sv

app.get('/', (req, res) => {
    res.render('main', {page:'home'})
})

app.get('/products', (req, res) => {
    res.render('main', {page:'products', products: products})
})

app.get('/products', (req, res) => { // Devuelve todos los productos
    res.send(products)
})
app.get('/products/:id', (req, res) => { // Devuelve un producto según su id
    const { id } = req.params
    const prod = products.find(e => e.id == id)
    prod ? res.send(prod) : res.send(err)
})
app.post('/products', (req, res) => { // Recibe y agrega un producto, y lo devuelve con su id asignado
    const newProd = req.body
    const newId = products.at(-1).id + 1
    newProd.id = newId
    products.push(newProd)
    res.send(products.find(e => e.id == newId))
})
app.post('/', (req, res) => { // Formulario para sumar productos
    const newProd = req.body
    const newId = products.at(-1).id + 1
    newProd.id = newId
    products.push(newProd)
    res.render('main', {page:'home'})
})
app.put('/products/:id', (req, res) => { // Recibe y actualiza un producto según su id
    const { id } = req.params
    const prodIndex = products.findIndex(e => e.id == id) 
    !prodIndex && res.send(err) 
    console.log(prodIndex)
    products.splice(prodIndex, 1, req.body)
    const prod = products.find(e => e.id == id)
    res.send(prod)
})
app.delete('/products/:id', (req, res) => { // Elimina un producto según su id 
    const { id } = req.params
    const prodIndex = products.findIndex(e => e.id == id)
    if (prodIndex != -1){
        products.splice(prodIndex, 1)
        res.send(`Se ha eliminado con éxito el producto con id ${id}`)
    } else res.send(err)
})