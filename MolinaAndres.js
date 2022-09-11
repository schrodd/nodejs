class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }
    getFullName(){
        console.log(`${this.nombre} ${this.apellido}`)
    }
    addMascota(nombre){
        if (Array.isArray(this.mascotas)) {
            this.mascotas.push(nombre)
        } else {
            console.log(`La propiedad 'mascotas' no es un array`)
        }
    }
    countMascotas(){
        if (this.mascotas.length > 0) {
            return console.log(this.mascotas.length)
        } else {
            console.log(`${this.nombre} no tiene mascotas`)
        }   
    }
    addBook(nombre, autor) {
        if (Array.isArray(this.libros)) {
            this.libros.push({nombre: nombre, autor: autor})
        } else {
            console.log(`La propiedad 'libros' no es un array`)
        }
    }
    getBookNames(){
        if (this.libros.length > 0) {
            if (Array.isArray(this.libros)) {
                console.log(this.libros.map(e => e.nombre))
            } else {
                console.log(`La propiedad 'libros' no es un array.`)
            }
        } else {
            console.log(`No hay libros`)
        }
    }
}

const andres = new Usuario('Andrés', 'Molina', [], [])

andres.getFullName()
andres.countMascotas()
andres.addMascota('Mila')
andres.countMascotas()
andres.addMascota('Pancho')
andres.countMascotas()
andres.getBookNames()
andres.addBook('12 reglas para vivir', 'Jordan Peterson')
andres.getBookNames()
andres.addBook('Harry Potter', 'JK Rowling')
andres.getBookNames()