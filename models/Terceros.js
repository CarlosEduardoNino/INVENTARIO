
import mongoose from 'mongoose';

const TercerosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    identificacion: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['client', 'proveedor'] }, // "client" para clientes, "proveedor" para proveedores
    estado: { type: String, default: 'act', enum: ['act', 'inac'] } // "act" para activo, "inac" para inactivo
}, {
    timestamps: true
});

export default mongoose.model('Terceros', TercerosSchema);
