import { Router } from "express";
import { check } from "express-validator";
import {
    createArticulo,
    getArticulos,
    getArticuloById,
    updateArticulo,
    toggleArticuloState,
    getArticulosByCategory,
    getArticulosByStock
} from "../controllers/articuloscontrollers.js";

import { validarCampos } from "../middleware/validar-datos.js";
import { validarJWT } from "../middleware/validar-jwt.js";

const router = Router();

// POST: Crear un artículo
router.post(
    "/",
    [
         validarJWT,
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("precio", "El precio es obligatorio y debe ser numérico").isFloat({ min: 0 }),
        check("stock", "El stock debe ser un número entero no negativo").isInt({ min: 0 }),
        check("categoria", "La categoría es obligatoria").notEmpty(),
        check("categoria", "El ID de la categoría debe ser válido").isMongoId(),
        validarCampos,
       
    ],
    createArticulo
);

// GET: Listar todos los artículos
router.get("/",[
    validarJWT,
   

    validarCampos
], getArticulos);

// GET: Obtener un artículo por ID
router.get(
    "/:id",
    [
        validarJWT,
        
        validarCampos
    ],
    getArticuloById
);

// PUT: Actualizar un artículo
router.put(
    "/:id",
    [
        validarJWT,
        check("id", "ID no válido").isMongoId(),
        check("name", "El nombre debe ser un texto").optional().isString(),
        check("price", "El precio debe ser numérico").optional().isFloat({ min: 0 }),
        check("stock", "El stock debe ser un número entero no negativo").optional().isInt({ min: 0 }),
        validarCampos
    ],
    updateArticulo
);

// PATCH: Cambiar estado de un artículo (activar/inactivar)
router.put(
    "/estado/:id",
    [
        validarJWT,
        check("id", "ID no válido").isMongoId(),
        validarCampos
    ],
    toggleArticuloState
);

// GET: Obtener artículos por categoría
router.get(
    "/categoria/:category",
    [
        validarJWT,
        
        validarCampos
    ],
    getArticulosByCategory
);

// GET: Obtener artículos con stock debajo de X
router.get(
    "/stock/:stock",
    [
        validarJWT,
       
        validarCampos
    ],
    getArticulosByStock
);

export default router;
