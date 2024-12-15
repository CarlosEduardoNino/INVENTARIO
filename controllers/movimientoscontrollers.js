import movimientosModel from "../models/Movimientos.js";

export const postMovimientos = async (req, res) => {
    try {
        const {
            tipo,
            numeroFactura,
            fecha,
            articulos,
            valor,
            iva,
            total,
            estado,
        } = req.body;

        // Validar que articulos sea un array
        if (!Array.isArray(articulos) || articulos.length === 0) {
            return res.status(400).json({ error: "El movimiento debe tener al menos un artículo." });
        }

        // Crear el documento
        const movimiento = new movimientosModel({
            tipo,
            numeroFactura,
            fecha,
            articulos, // Aquí ya llega como un array
            valor,
            iva,
            total,
            estado
        });

        await movimiento.save();
        res.json({ movimiento });
    } catch (error) {
        console.error("Error al registrar un movimiento:", error);
        res.status(400).json({ 
            error: "Hubo un error al registrar un nuevo movimiento",
            details: error.message || error
        });
    }
};


export const putMovimientos = async (req, res) => {
    try {
        const { id } = req.params; 
        const { 
            tipo, 
            numeroFactura, 
            fecha, 
            articulos, 
            valor, 
            iva, 
            total, 
            estado 
        } = req.body;

        const movimiento = await movimientosModel.findByIdAndUpdate(
            id,
            { tipo, numeroFactura, fecha, articulos, valor, iva, total, estado },
            { new: true }
        );

        if (!movimiento) {
            return res.status(404).json({ error: "Movimiento no encontrado" });
        }

        res.json({ movimiento });
    } catch (error) {
        console.error("Error al actualizar el movimiento:", error);
        res.status(400).json({ error: "Error al actualizar el movimiento", details: error.message });
    }
};

export const getMovimientos = async (req, res) => {
    try {
        const movimientos = await movimientosModel.find().populate('articulos.id');
        res.json({ movimientos });
    } catch (error) {
        console.error("Error al obtener movimientos:", error);
        res.status(400).json({ error: "Parece que hubo un error al traer todos los movimientos" });
    }
};

export const getMovimiento = async (req, res) => {
    try {
        const { id } = req.params
        const movimiento = await movimientosModel.findById(id)
        res.json({ movimiento })
    } catch (error) {
        res.status(400).json({ error: "parece que hubo un error al buscar el movimiento" })
    }
}

export const getActivosinactivos = async (req, res) => {
    try {
        const { accion } = req.params
        if (accion == "activos") {
            const activos = await movimientosModel.find({ estado: 1 })
            res.json({ activos })
        }
        else if (accion == "inactivos") {
            const inactivos = await movimientosModel.find({ estado: 0 })
            res.json({ inactivos })
        }
    } catch (error) {

    }
}

export const putActivarInactivar = async (req, res) => {
    try {
        const movimientos = await movimientosModel.findById(req.params.id);
        if (!movimientos) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        
      
        movimientos.estado = movimientos.estado === '1' ? '0' : '1';
        await movimientos.save();
        
        res.status(200).json(movimientos);
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado del artículo', error });
    }
}

export const getMovimientoTipo = async (req, res) => {
    try {
        const tipos = {
            entradas: 1,
            salidas: 2,
            "devolucion Entrada": 3,
            "devolucion salida": 4,
        };

        const tipoKey = req.params.tipo;
        const tipoValue = tipos[tipoKey] || parseInt(tipoKey);

        if (!tipoValue) {
            return res.status(400).json({ error: "Tipo inválido" });
        }

        const movimientos = await movimientosModel.find({ tipo: tipoValue });
        res.json({ movimientos });
    } catch (error) {
        console.error("Error al obtener movimientos por tipo:", error);
        res.status(400).json({ error: "Hubo un error al realizar la operación" });
    }
};


export const getMovimientosFechas = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.params;
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        if (isNaN(inicio) || isNaN(fin)) {
            return res.status(400).json({ error: "Fechas inválidas" });
        }

        const movimientos = await movimientosModel.find({
            fecha: { $gte: inicio, $lte: fin },
        });

        res.json({ movimientos });
    } catch (error) {
        console.error("Error al obtener movimientos por fechas:", error);
        res.status(400).json({ error: "Error al realizar la operación" });
    }
};


export default {
    postMovimientos,
    putMovimientos,
    getMovimientos,
    getMovimiento,
    getActivosinactivos,
    putActivarInactivar,
    getMovimientoTipo,
    getMovimientosFechas
};
