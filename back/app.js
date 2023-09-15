import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import helmet from 'helmet';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.routes.js';
import storeRoutes from './routes/store.routes.js';
import sectionRoutes from './routes/sections.routes.js';

import {config} from 'dotenv'

//Se inicializa el objeto ejecutandolo y se guarda en una constante app
//app es básicamente el servidor
const app = express();
config();
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ['self'],
        scriptSrcElem: ['self', 'unsafe-inline'],
        styleSrc: ['self', 'unsafe-inline']

    }
}))

app.use(cors({
    origin: process.env.REACT_URL,
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