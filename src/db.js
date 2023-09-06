import mongoose from "mongoose";


//Conexión a la Base de Datos
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/dbsubastas');
        console.log(">>> BD Conectada!")
    } catch (error) {
        console.log(error)
    }
};