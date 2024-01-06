//Desarrollar un servidor express que, en su archivo app.js importe al archivo de ProductManager que actualmente tenemos.
const express = require("express");
const app = express();

//Se deberá utilizar la clase ProductManager que actualmente utilizamos con persistencia de archivos. 
const {productManager} = require("./ProductManager")

//Para testear si el servidor esta online
app.get("/ping", (req, res)=> {
    res.send("pong")

})

//Endpoint de ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. 
app.get("/products", async (req, res) => {

    try {
        //Agregar el soporte para recibir por query param el valor ?limit= el cual recibirá un límite de resultados.
        const limit = req.query.limit;

        let products = await productManager.getProducts(limit);
        //regreso los productos
        res.send(products)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }

    
})

//Endpoint de ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id), y devolver sólo el producto solicitado, en lugar de todos los productos. 
app.get("/products/:id", async (req, res) => {

    try {
        //Agregar el soporte para recibir por req.params el pid
        const id = req.params.id;

        let product = await productManager.getProductById(id);
        //regreso el producto
        res.send(product)

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");    
    }

    
})


//Se oye en el puerto 3000 e imprime el siguiente texto en consola
app.listen(3000, () => {
    console.log("Aplicacion funcionando en el puerto 3000")
})