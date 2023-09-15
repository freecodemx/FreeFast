import { Product } from '../models/product.model.js';
import { Section } from '../models/section.model.js'; // Asegúrate de importar el modelo de Sección


//Obtiene todos los productos de un usuario.
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id }).populate('user');
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Algo ha salido mal!" });
    }
};

//Creación del Producto.
export const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, disponible, fabricante, numero_existencias, estatus, imageURL, section } = req.body;

        // Busca la sección por su nombre
        const sectionName = await Section.findOne({ nombre: section });
      
        if (!sectionName) {
            return res.status(404).json({ message: "La sección no se encontró" });
        }
        const sectionsName = sectionName.nombre;
        //Por si falla.
        //console.log(sectionName)
        const newProduct = new Product({
            nombre,
            descripcion,
            precio,
            categoria,
            disponible,
            fabricante,
            numero_existencias,
            estatus,
            imageURL,
            section: sectionName._id, // Asigna el ObjectId de la sección
            user: req.user.id
        });

        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Algo ha salido mal!" });
    }
};
//Obtiene un único Producto por id.
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user');
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product)
    } catch (error) {
        return res.status(400).json({ message: "Producto no encontrado!" })
    }
};
//Borra Producto por id
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        return res.status(400).json({ message: "Producto no encontrado!" })
    }
};
//Actualiza Producto por id.
export const updateProduct = async (req, res) => {
    try {
      // Verificar si el producto existe antes de intentar actualizarlo
      const existingProduct = await Product.findById(req.params.id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Actualizar el producto si existe
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      
      res.json(updatedProduct);
      console.log('Aqui:' & req.params)
    } catch (error) {
    console.log(error)
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  };
  
//Obtiene todos los Productos de todos los usuarios.
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user'); // Fetch all products
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving products" });
    }
};

//Solicitud de producto.
export const sendProduct = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        // Verificar si el producto existe
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Verificar si el usuario es el comprador
        if (product.user.toString() === userId) {
            return res.status(403).json({ message: 'No puedes solicitar tu propio producto' });
        }

        // Actualizar el estado del producto a "Solicitado" utilizando el método update
        await Product.updateOne({ _id: productId }, { $set: { estatus: 'Solicitado' } });

        return res.status(200).json({ message: 'Solicitud de producto enviada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
}; 

//Aceptar producto.
export const acceptProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        // Verificar si el producto existe
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualizar el estado del producto a "Entregado"
        product.estatus = 'Entregado';
        await product.save();
        console.log(message)
        return res.status(200).json({ message: 'Producto marcado como entregado' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

