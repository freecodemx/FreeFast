import { Product } from '../models/product.model.js';
import { Section } from '../models/section.model.js'; // Asegúrate de importar el modelo de Sección

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user.id }).populate('user');
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Algo ha salido mal!" });
    }
};

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
// Resto del código de tus controladores sin cambios...

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user');
        if (!product) return res.status(404).json({ message: "Producto no encontrado" });
        res.json(product)
    } catch (error) {
        return res.status(400).json({ message: "Producto no encontrado!" })
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.status(200).json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        return res.status(400).json({ message: "Producto no encontrado!" })
    }
};
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
        res.json(product)
    } catch (error) {
        return res.status(400).json({ message: "Producto no encontrado!" })
    }
};
//Obtienes todos los productos.

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('user'); // Fetch all products
        res.json(products);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving products" });
    }
};