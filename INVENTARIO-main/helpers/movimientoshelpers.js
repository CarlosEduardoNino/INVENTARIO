import mongoose from "mongoose";
import Movimientos from "../models/Movimientos.js";
import Articulos from "../models/Articulos.js";


export const helperMovimientos = {
    validarId: async (id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("El ID proporcionado no es válido");
        }
        const existe = await Movimientos.findById(id);
        if (!existe) {
            throw new Error("El ID del movimiento no existe en la BD");
        }
    },


    validarTipo: (tipo) => {
        const tiposValidos = {
            entrada: 1,
            salida: 2,
            devolucion: 3,
        };
        if (!Object.keys(tiposValidos).includes(tipo)) {
            throw new Error("Tipo de movimiento no válido");
        }
        return tiposValidos[tipo]; // Devuelve el número si es necesario
    },
    validarStockParaSalida: async (articulos) => {
        const ids = articulos.map(articulo => articulo.id);
        const articulosBD = await Articulos.find({ _id: { $in: ids } });

        const stockMap = articulosBD.reduce((acc, articulo) => {
            acc[articulo._id] = articulo.stock;
            return acc;
        }, {});

        for (const articulo of articulos) {
            if (!stockMap[articulo.id] || stockMap[articulo.id] < articulo.cantidad) {
                throw new Error(`Stock insuficiente para el artículo con ID: ${articulo.id}`);
            }
        }
    }
};

export default { helperMovimientos };
