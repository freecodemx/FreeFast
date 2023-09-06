import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String
    },
    // Otras propiedades específicas de la tienda
},
{
    timestamps: true
});

export const Store = mongoose.model('Store', storeSchema);
