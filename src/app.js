import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import storeRoutes from './routes/store.routes.js';
import sectionRoutes from './routes/sections.routes.js';

//Se inicializa el objeto ejecutandolo y se guarda en una constante app
//app es básicamente el servidor
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
//Convierte el body en formato json
app.use(express.json());
app.use(cookieParser());

//
app.use("/api", authRoutes);
app.use("/api", productRoutes);
app.use("/api", storeRoutes);
app.use("/api", sectionRoutes);

//
export default app;