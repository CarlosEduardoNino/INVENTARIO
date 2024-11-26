import movimientosModel from "../models/Movimientos.js";

export const postMovimientos = async (req, res) => {
    try {
        const {
            tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }],
            valor,
            iva,
            total,
            estado,
        } = req.body;

        const movimiento = new movimientosModel({
            tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }],
            valor,
            iva,
            total,
            estado
        });

        await movimiento.save();
        res.json({ movimiento });
    } catch (error) {
        console.error("Error al registrar un movimiento:", error); // Mostrar el error en consola
        res.status(400).json({ 
            error: "Hubo un error al registrar un nuevo movimiento",
            details: error.message || error // Incluir detalles del error
        });
    }
};


export const putMovimientos = async (req, res) => {
    try {
        const { ide } = req.params
        const { tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }]
            ,
            valor,
            iva,
            total,
            estado, } = req.body
        const movimiento = await movimientosModel.findByIdAndUpdate(ide, {
            tipo,
            numeroFactura,
            fecha,
            articulos: [{ id, cantidad, precio }]
,
            valor,
            iva,
            total,
            estado
        }, { new: true })
        res.json({ movimiento })
    } catch (error) {
        res.status(400).json({ error: "parece que hubo un error en la actualizacion del movimiento" })
        console.log(error);
    }
}

export const getMovimientos = async (req, res) => {
    try {
        const movimientos = await movimientosModel.find()
        res.json({ movimientos })
    } catch (error) {
        res.status(400).json({ error: "parece que hubo un error  al traer todos los movimientos" })
        console.log(error);
    }
}

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
        const { accion } = req.params
        const { id } = req.params
        if (accion == "activar") {
            const movimiento = await movimientosModel.findByIdAndUpdate(id, { estado: 1 }, { new: true })
            res.json({ movimiento })
        }
        else if (accion == "inactivar") {
            const movimiento = await movimientosModel.findByIdAndUpdate(id, { estado: 0 }, { new: true })
            res.json({ movimiento })
        }
    } catch (error) {
        res.status(400).json({ error: "parece que hubo un error al hacer la operacion" })
        console.log(error);
    }
}

export const getMovimientoTipo = async (req, res) => {
    try {
        const { tipo } = req.params
        if (tipo == "entradas" || tipo == 1) {
            const entradas = await movimientosModel.find({ tipo: 1 })
            res.json({ entradas })
        }
        else if (tipo == "salidas" || tipo == 2) {
            const salidas = await movimientosModel.find({ tipo: 2 })
            res.json({ salidas })
        }
        else if (tipo == "devolucion Entrada" || tipo == 3) {
            const devolucionesEntrada = await movimientosModel.find({ tipo: 3 })
            res.json({ devolucionesEntrada })
        }
        else if (tipo == "devolucion salida" || tipo == 4) {
            const devolucionesSalida = await movimientosModel.find({ tipo: 4 })
            res.json({ devolucionesSalida })
        }
    } catch (error) {
        res.status(400).json({ error: "hubo un error al realizar la operacion" })
        console.log(error);
    }
}

export const getMovimientosFechas = async (req, res)=>{
    try {
        const  {fechaInicio, fechaFin}  = req.params
        const  movimientos = await movimientosModel.find({
            fecha:{
                $gte:new Date(fechaInicio),
                $lte:new Date(fechaFin)
            }
        })
        res.json({movimientos})
    } catch (error) {
        res.status(400).json({error:"error al realizar la operacion"})
        console.log(error);
    }
}

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
