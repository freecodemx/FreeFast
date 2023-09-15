import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        required: true
    },
    fabricante: {
        type: String,
        required: true
    },
    numero_existencias: {
        type: String,
        required: true
    },
    estatus:{
        type: String,
    },
    imageURL:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        required: true
    },

},
    {
        timestamps: true
    }
);

export const Product = mongoose.model('Product', productSchema);


