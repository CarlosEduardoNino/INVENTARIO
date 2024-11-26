import Movimientos from "../models/Movimientos.js";
import Articulos from "../models/Articulos.js";

export const helperMovimientos = {
  validarId: async (id) => {
    const existe = await Movimientos.findById(id);
    if (!existe) {
      throw new Error("El ID del movimiento no existe en la BD");
    }
  },
  validarTipo: (tipo) => {
    const tiposValidos = ["entrada", "salida", "devolucion"];
    if (!tiposValidos.includes(tipo)) {
      throw new Error("Tipo de movimiento no válido");
    }
  },
  validarStockParaSalida: async (articulos) => {
    for (const articulo of articulos) {
      const articuloBD = await Articulos.findById(articulo.id);
      if (!articuloBD || articuloBD.stock < articulo.cantidad) {
        throw new Error(`Stock insuficiente para el artículo con ID: ${articulo.id}`);
      }
    }
  }
};


export default  { helperMovimientos };
