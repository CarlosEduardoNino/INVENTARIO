
import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    console.log('Token recibido:', token); 

    if (!token) {
        return res.status(401).json({ message: 'No hay token en la petición' });
    }

    try {
        const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = { id, rol };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

export default {validarJWT}