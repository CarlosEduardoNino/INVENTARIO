import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuarios from '../models/Usuarios.js';

// Registrar un usuario
export const register = async (req, res) => {
    const { nombre, email, password,  } = req.body;

    // Validar campos
    if (!nombre || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'El correo electrónico no es válido.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    try {
        // Verificar si el usuario ya existe
        const existeUsuario = await Usuarios.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Crear nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = new Usuarios({
            nombre,
            email,
            password: hashedPassword,
            estado: 'activo' // Estado inicial como activo
        });
        await nuevoUsuario.save();

        // Generar token
        const token = jwt.sign(
            { userId: nuevoUsuario._id, rol: nuevoUsuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: nuevoUsuario, token });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro', error });
    }
};

// Iniciar sesión
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

    
        const usuario = await Usuarios.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

      
        if (usuario.estado !== 'activo') {
            return res.status(403).json({ message: 'El usuario está inactivo. Contacte al administrador.' });
        }

    
        const esValida = await bcrypt.compare(password, usuario.password);
        if (!esValida) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

      
        const token = jwt.sign(
            { id: usuario._id, },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Login exitoso',
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
               
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

// Actualizar contraseña
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres.' });
        }

        const usuario = await Usuarios.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        usuario.password = hashedPassword;
        await usuario.save();

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar contraseña', error });
    }
};


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password,  } = req.body;

        const usuario = await Usuarios.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        
        if (nombre) usuario.nombre = nombre;
        if (email) usuario.email = email;
       


        if (password && password.trim() !== '') {
            if (password.length < 6) {
                return res.status(400).json({ 
                    message: 'La contraseña debe tener al menos 6 caracteres.' 
                });
            }
            usuario.password = await bcrypt.hash(password, 10);
        }

        await usuario.save();

        const usuarioResponse = usuario.toObject();
        delete usuarioResponse.password; 

        res.status(200).json({ 
            message: 'Usuario actualizado correctamente', 
            usuario: usuarioResponse 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error });
    }
};
// Cambiar estado del usuario
export const toggleEstado = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuarios.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
        await usuario.save();

        res.status(200).json({ message: 'Estado actualizado correctamente', usuario });
    } catch (error) {
        res.status(500).json({ message: 'Error al cambiar el estado del usuario', error });
    }
};

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuarios.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuarios.findById(id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

export default {
    register,
    login,
    updatePassword,
    updateUser,
    toggleEstado,
    getUsuarios,
    getUsuarioById
};
