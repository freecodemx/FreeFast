import mongoose from "mongoose";
import app from './app.js'
import pg from 'pg'



const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    //ssl: true
});

//Conexión a la Base de Datos
export const connectDB =  () => {
    try {
        app.get('/ping', async (req, res) => {
            const result = await pool.query('SELECT NOW()')
            return res.json(result.rows[0])
        })
        console.log(">>>  BD Conectada!")
    } catch (error) {
        console.log(error)
    }
};