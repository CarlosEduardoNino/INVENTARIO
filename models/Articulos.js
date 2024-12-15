import mongoose from 'mongoose';

const ArticulosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    categoria: { type: String, required:true},
    estado: { type: String, default: '1', enum: ['1', '0'] } 
}, {
    timestamps: true
});

export default mongoose.model('Articulos', ArticulosSchema);
