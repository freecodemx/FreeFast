import mongoose from 'mongoose'; 

const sectionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String
    }
},
    {
        timestamps: true // Esto agrega campos createdAt y updatedAt automáticamente
    });

export const Section = mongoose.model('Section', sectionSchema);
