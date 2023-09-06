//Si se importan modulos propios se agrega la extension js
import app from './app.js'
import {connectDB} from './db.js'


//Objeto para la conexión a la base de datos
connectDB();
//Aquí se inicia el puerto, que se desea, para el servidor.
app.listen(3000)
console.log('Servidor en el puerto', 3000)