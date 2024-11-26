    import mongoose from 'mongoose';

    const CategoriasSchema = new mongoose.Schema({
        nombre: { type: String, required: true }, // Nuevo campo nombre
        descripcion: { type: String, required: true },
        estado: { type: String, default: '1', enum: ['1', '0'] }
    }, {
        timestamps: true
    });

    export default mongoose.model('Categorias', CategoriasSchema);
