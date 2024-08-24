const db = require('../../DB/sqlite')

//CREAR
const crearCargo = (nombre_cargo, descripcion_cargo, callback) => {
    const sql = `INSERT INTO cargos (nombre_cargo, descripcion_cargo) VALUES (?, ?)`
    db.run(sql, [nombre_cargo, descripcion_cargo], function(err){
        callback(err, {id: this.lastID})
    })
}

//Leer
const leerCargos = (callback) => {
    const sql = `SELECT * FROM cargos`;
    db.all(sql, [], callback)
}

//Actualizar
const actualizarCargo = (id_cargo, nombre_cargo, descripcion_cargo, callback) => {
    const sql = `UPDATE cargos SET nombre_cargo = ?, descripcion_cargo = ? WHERE id_cargo = ?`
    db.run(sql, [nombre_cargo, descripcion_cargo, id_cargo], callback)
}

//Eliminar
const eliminarCargo = (id_cargo, callback) => {
    const sql = `DELETE FROM cargos WHERE id_cargo = ?`
    db.run(sql, [id_cargo], callback)
}

module.exports = {crearCargo, leerCargos, actualizarCargo, eliminarCargo}