import Articulos from '../models/Articulos.js';

// Crear un artículo
export const createArticulo = async (req, res) => {
    try {
        const { nombre, precio, stock, img, categoria, estado } = req.body;
        const articulo = new Articulos({ nombre, precio, stock, img, categoria, estado });
        await articulo.save();
        res.status(201).json(articulo);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el artículo', error });
    }
};

// Listar todos los artículos
export const getArticulos = async (req, res) => {
    try {
        const articulos = await Articulos.find();
        res.status(200).json(articulos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los artículos', error });
    }
};

// Obtener un artículo por ID
export const getArticuloById = async (req, res) => {
    try {
        const articulo = await Articulos.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json(articulo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el artículo', error });
    }
};

// Actualizar un artículo
export const updateArticulo = async (req, res) => {
    try {
        const updatedArticulo = await Articulos.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedArticulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json(updatedArticulo);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el artículo', error });
    }
};

// Cambiar estado de un artículo (activar/inactivar)
export const toggleArticuloState = async (req, res) => {
    try {
        const articulo = await Articulos.findById(req.params.id);
        if (!articulo) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        
      
        articulo.estado = articulo.estado === '1' ? '0' : '1';
        await articulo.save();
        
        res.status(200).json(articulo);
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado del artículo', error });
    }
};


// Obtener artículos por categoría
export const getArticulosByCategory = async (req, res) => {
    try {
        const articulos = await Articulos.find({ category: req.params.category });
        res.status(200).json(articulos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener artículos por categoría', error });
    }
};

// Obtener artículos con stock 
export const getArticulosByStock = async (req, res) => {
    try {
        const articulos = await Articulos.find({ stock: { $lt: req.params.stock } });
        res.status(200).json(articulos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener artículos con bajo stock', error });
    }
};


export default {
    createArticulo,
    getArticulos,
    getArticuloById,
    updateArticulo,
    toggleArticuloState,
    getArticulosByCategory,
    getArticulosByStock
};