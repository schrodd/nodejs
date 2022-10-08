const express = require('express')
const routes = express.Router()
const products = [
    {
        title: "Hamburguesa de la casa",
        id: 1,
        price: "200",
        thumbnail: "https://api.lorem.space/image/burger?w=150&h=150"
    },
    {
        title: "Hamburguesa especial",
        id: 2,
        price: "300",
        thumbnail: "https://api.lorem.space/image/burger?w=150&h=150"
    },
    {
        title: "Hamburguesa King",
        id: 3,
        price: "500",
        thumbnail: "https://api.lorem.space/image/burger?w=150&h=150"
    }
]
const err = { error: 'producto no encontrado' }

routes.get('/', (req, res) => { // Devuelve todos los productos
    res.send(products)
})
routes.get('/:id', (req, res) => { // Devuelve un producto según su id
    const { id } = req.params
    const prod = products.find(e => e.id == id)
    prod ? res.send(prod) : res.send(err)
})
routes.post('/', (req, res) => { // Recibe y agrega un producto, y lo devuelve con su id asignado
    const newProd = req.body
    const newId = products.at(-1).id + 1
    newProd.id = newId
    products.push(newProd)
    res.send(products.find(e => e.id == newId))
})
routes.put('/:id', (req, res) => { // Recibe y actualiza un producto según su id
    const { id } = req.params
    const prodIndex = products.findIndex(e => e.id == id) 
    !prodIndex && res.send(err) 
    console.log(prodIndex)
    products.splice(prodIndex, 1, req.body)
    const prod = products.find(e => e.id == id)
    res.send(prod)
})
routes.delete('/:id', (req, res) => { // Elimina un producto según su id 
    const { id } = req.params
    const prodIndex = products.findIndex(e => e.id == id)
    if (prodIndex != -1){
        products.splice(prodIndex, 1)
        res.send(`Se ha eliminado con éxito el producto con id ${id}`)
    } else res.send(err)
}) 

module.exports = routes