import Terceros from "../models/Terceros.js";

export const helperTerceros = {
  validarId: async (id) => {
    const existe = await Terceros.findById(id);
    if (!existe) {
      throw new Error("El ID del tercero no existe en la BD");
    }
  },
  validarTipo: (tipo) => {
    const tiposValidos = ["client", "proveedor"];
    if (!tiposValidos.includes(tipo)) {
      throw new Error("Tipo de tercero no válido");
    }
  },
  validarIdentificacionUnica: async (identificacion) => {
    const existe = await Terceros.findOne({ identificacion });
    if (existe) {
      throw new Error("La identificación ya está registrada en la BD");
    }
  }
};

export default {helperTerceros}