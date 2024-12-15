import Categorias from "../models/Categorias.js";

export const helperCategorias = {
  validarId: async (id) => {
    const existe = await Categorias.findById(id);
    if (!existe) {
      throw new Error("El ID de la categoría no existe en la BD");
    }
  },
  validarDescripcionUnica: async (descripcion) => {
    const existe = await Categorias.findOne({ descripcion });
    if (existe) {
      throw new Error("La descripción de la categoría ya existe en la BD");
    }
  }
};


export default { helperCategorias };
