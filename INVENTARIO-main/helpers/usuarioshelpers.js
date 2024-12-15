import usuarios from "../models/Usuarios.js";

export const helperUsuarios = {

    async obtenerUsuarios() {
        return await usuarios.find();
    },

    async obtenerUsuario(id) {
        return await usuarios.findById(id);
    },

    async eliminarUsuario(id) {
        return await usuarios.findByIdAndDelete(id);
    },

    async actualizarUsuario(id, data) {
        return await usuarios.findByIdAndUpdate(id, data, { new: true });
    },


}
export default helperUsuarios