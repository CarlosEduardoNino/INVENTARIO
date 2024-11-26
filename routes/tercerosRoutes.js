// routes/terceros.js
import { Router } from 'express';
import { check } from 'express-validator';
import {
    createTercero,
    getTerceros,
    getTerceroById,
    updateTercero,
    getTercerosByTipo,
    updateEstadoTercero
} from '../controllers/terceroscontrollers.js';


import { validarCampos } from '../middleware/validar-datos.js';
import { validarJWT } from '../middleware/validar-jwt.js';

const router = Router();

// POST: Crear un tercero
router.post(
    '/',
    [
        validarJWT,        
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('identificacion', 'La identificación es obligatoria').notEmpty(),
        check('tel', 'El teléfono es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('tipo', 'El tipo es obligatorio').isIn(['client', 'proveedor']),
        validarCampos
    ],
    createTercero
);

// GET: Listar todos los terceros
router.get('/',[
    validarJWT,

    validarCampos
], getTerceros);

// GET: Obtener un tercero por ID
router.get(
    '/:id',
    [   
        validarJWT,
      
        validarCampos
    ],
    getTerceroById
);

// PUT: Actualizar un tercero
router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'ID no válido').isMongoId(),
        check('nombre', 'El nombre debe ser un texto').optional().isString(),
        check('identificacion', 'La identificación debe ser un texto').optional().isString(),
        check('tel', 'El teléfono debe ser un texto').optional().isString(),
        check('email', 'El email debe ser válido').optional().isEmail(),
        check('tipo', 'El tipo debe ser válido').optional().isIn(['client', 'proveedor']),
        validarCampos
    ],
    updateTercero
);

router.put(
    '/estado/:id',
    [
        validarJWT,
        check("id", "ID no válido").isMongoId(),
        check("estado", "El estado debe ser un texto").optional().isString(),
        validarCampos
    ],updateEstadoTercero
)

// GET: Obtener terceros por tipo
router.get(
    '/tipo/:tipo',
    [
        validarJWT,
        check('tipo', 'El tipo debe ser válido').isIn(['client', 'proveedor']),
        validarCampos
    ],
    getTercerosByTipo
);

export default router;
