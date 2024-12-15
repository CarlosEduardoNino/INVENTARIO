import mongoose from 'mongoose';

const MovimientosSchema = new mongoose.Schema({
    tipo:{type:Number, required: true}, //entrada = 1 , salida = 2 , devolucionEntrada = 3, devolucionSalida = 4
    numeroFactura:{type:String, required: true},
    fecha:{type:Date, required: true},
    articulos:[{
        id: { type: mongoose.Schema.Types.ObjectId, required: true, }, 
        nombre: { type: String, required: false },
        cantidad:{type:Number, required: true},
        precio:{type:Number, required: true}
    }],
    valor:{type:Number, required: true}, 
    iva:{type:Number, required: true},
    total:{type:Number, required: true},
    estado: { type: String, default: '1', enum: ['1', '0'] }   // 1:activo 0:inactivo
}, {
    timestamps: true
});

export default mongoose.model('Movimientos', MovimientosSchema);
