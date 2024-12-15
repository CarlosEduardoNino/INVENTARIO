// models/Usuarios.js
import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estado: { type: String, default: 'activo', enum: ['activo', 'inactivo'] },

    
}, {
    timestamps: true
});

export default mongoose.model('Usuario', UsuarioSchema);
