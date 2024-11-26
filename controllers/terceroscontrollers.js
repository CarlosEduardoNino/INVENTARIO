import Terceros from '../models/Terceros.js';

// Crear un tercero
export const createTercero = async (req, res) => {
    try {
        const tercero = new Terceros(req.body);
        await tercero.save();
        res.status(201).json(tercero);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el tercero', error });
    }
};

// Listar todos los terceros
export const getTerceros = async (req, res) => {
    try {
        const terceros = await Terceros.find();
        res.status(200).json(terceros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los terceros', error });
    }
};

// Obtener un tercero por ID
export const getTerceroById = async (req, res) => {
    try {
        const tercero = await Terceros.findById(req.params.id);
        if (!tercero) {
            return res.status(404).json({ message: 'Tercero no encontrado' });
        }
        res.status(200).json(tercero);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el tercero', error });
    }
};

// Actualizar un tercero
export const updateTercero = async (req, res) => {
    try {
        const updatedTercero = await Terceros.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTercero) {
            return res.status(404).json({ message: 'Tercero no encontrado' });
        }
        res.status(200).json(updatedTercero);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tercero', error });
    }
};

// Obtener terceros por tipo
export const getTercerosByTipo = async (req, res) => {
    try {
        const terceros = await Terceros.find({ tipo: req.params.tipo });
        res.status(200).json(terceros);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener terceros por tipo', error });
    }
};

// Actualizar el estado de un tercero
export const updateEstadoTercero = async (req, res) => {
    try {
        const { estado } = req.body; 
        if (!estado || !['act', 'inac'].includes(estado)) {
            return res.status(400).json({ message: 'Estado inválido. Debe ser "act" o "inac".' });
        }

     
        const tercero = await Terceros.findByIdAndUpdate(
            req.params.id,
            { estado }, 
            { new: true } 
        );

        if (!tercero) {
            return res.status(404).json({ message: 'Tercero no encontrado' });
        }

        res.status(200).json(tercero);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del tercero', error });
    }
};
export default {
    createTercero,
    getTerceros,
    getTerceroById,
    updateTercero,
    getTercerosByTipo,
    updateEstadoTercero
}