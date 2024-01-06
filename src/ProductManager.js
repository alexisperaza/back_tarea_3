const fs = require('fs');


//clase con el nombre ProductManager
class ProductManager {
  constructor(filePath) {
    //contar con una variable this.path que se inicializara con el constructor
    this.path = filePath;
  }

  //metodo getProduct que lee el archivo y devuelve los productos en formato arreglo
  async getProducts(limit) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8');
      //Regresa la cantidad que limitada
      return limit ? JSON.parse(data).slice(0, limit) : JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o hay un error al leerlo, devuelve un array vacío.
      return [];
    }
  }
  
  //metodo getProductById recibe un id y lee el archivo y regresa el producto en formato objeto
  async getProductById(id) {

    const products = await this.getProducts(undefined);
    //convierto el id en number para realizar la comparacion
    const productById = products.find(product => product.id === Number(id));
    if(productById===undefined){
        return "Error: No se encontro producto"
    }
    return productById;
  }
}


// Se creará una instancia de la clase “ProductManager”
const productManager = new ProductManager('productos.json');

//importacion de la clase
module.exports = {productManager};