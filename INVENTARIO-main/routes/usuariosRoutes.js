// routes/auth.js
import { Router } from 'express';
import { check } from 'express-validator';
import { register,
    login,
    updatePassword,
    updateUser,
    getUsuarios,
    getUsuarioById,
    toggleEstado

} from '../controllers/usuarioscontrollers.js';
import  {validarDatos, validarCampos } from '../middleware/validar-datos.js';
import { validarJWT } from '../middleware/validar-jwt.js';

const router = Router();

// POST: Registro de usuario
router.post(
    '/register',

    [
       
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    register
);

// GET: Obtener todos los usuarios
router.get('/usuarios', [

   
    validarCampos
   
], getUsuarios );

// GET: Obtener un usuario por ID
router.get('/usuarios/:id', [
    validarJWT,

    validarCampos
], getUsuarioById);

// PUT: Actualizar un usuario
router.put('/usuarios/:id', [
    validarJWT,
    check('id', 'El ID del usuario debe ser válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').optional().notEmpty(),
    check('email', 'El correo debe ser válido').optional().isEmail(),
   
    validarCampos
], updateUser);

// PUT: Actualizar la contraseña de un usuario
router.put('/usuarios/:id/password', [
    validarJWT,
    check('id', 'El ID del usuario es obligatorio').isNumeric(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    check('Authorization', 'La cabecera de autorización es obligatoria').exists(),
    validarCampos
], updatePassword);

// POST: Login de usuario
router.post(
    '/login',
    [   
       
        check('email', 'El correo no es válido').isEmail(),
        check('password', 'La contraseña es obligatoria').notEmpty(),
        validarDatos
    ],
    login
);
// PUT: Cambiar el estado de un usuario

router.put('/estado/:id', [
    validarJWT, 
    check('id', 'El ID del usuario es obligatorio').notEmpty(),
    validarCampos
], toggleEstado);


export default router;