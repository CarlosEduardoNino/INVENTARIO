import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import cors from 'cors';

import articulos from './routes/articulosRoutes.js';
import categorias from './routes/categoriasRoutes.js';
import Articulos from './routes/articulosRoutes.js';
import movimientos from './routes/movimientosRoutes.js';
import terceros from './routes/tercerosRoutes.js';
import authRoutes from './routes/usuariosRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/Articulos', articulos);
app.use('/api/Categorias', categorias);
app.use('/api/Movimientos', movimientos);
app.use('/api/Terceros', terceros);
app.use('/api/Usuarios', authRoutes);

mongoose.connect(process.env.MONGODB_CNX)
    .then(() => console.log('Base de datos conectada'))
    .catch((error) => console.log('Error en la conexión a la base de datos:', error));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

