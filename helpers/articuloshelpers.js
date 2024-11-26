import Categoria from "../models/Categorias.js";  
import Articulos from "../models/Articulos.js";

export const helperArticulos = {
 
  validarCategoria: async (categoriaId) => {
    const categoriaExistente = await Categoria.findById(categoriaId);
    if (!categoriaExistente) {
      throw new Error(`La categoría con ID '${categoriaId}' no existe en la base de datos`);
    }
  },


  validarId: async (id) => {
    const existe = await Articulos.findById(id);
    if (!existe) {
      throw new Error("El ID del artículo no existe en la BD");
    }
  },

  validarStock: async (id, cantidad) => {
    const articulo = await Articulos.findById(id);
    if (articulo && articulo.stock < cantidad) {
      throw new Error("Stock insuficiente para este artículo");
    }
  }
};

export default { helperArticulos };
