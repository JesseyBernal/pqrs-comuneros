const sqlite3 = require('sqlite3').verbose();
const db_nombre = "./src/DB/pqrs.db";
const config = require("../config");

let db = new sqlite3.Database(db_nombre, (err) =>{
  if(err){
    console.error(err.message)
  }
  else{
    console.log('Base de datos conectada')
  }
})

module.exports = db

/*
const prueba = {
  id: 1,
  Nombre: 'Juan',
  edad: 43
}

function listaRegistros(tabla) {
  return prueba;
}

function unRegistro(tabla, id) {}

function agregarRegistro(tabla, datos) {}

function eliminarRegistro(tabla, id) {}

module.exports = {
  listaRegistros,
  unRegistro,
  agregarRegistro,
  eliminarRegistro,

};

/*


/*
let db = new sqlite3.Database("pqrs.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Conectado a la base de datos PQRSD");
});
*/
//let db = new sqlite3.Database('pqrs.db');

/*
const conexion = new sqlite3.Database("./pqrs.db");

function conectarSqlite(){
  let conexion = new sqlite3.Database("./pqrs.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Base de datos conectada.");
  });
}
conectarSqlite()

function cerrarSqlite(){
  conexion.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}
cerrarSqlite()


function listarDatos() {
  

  let sql = `SELECT id_pqrsd as Cedula, nombre_usuario as Nombre, nombre_estado as Estado, nombre_categoria as Categoria, fecha, asunto, (SELECT nombre_empresa FROM usuarios
    INNER JOIN empresas ON usuarios.id_empresa = empresas.id_empresa)as Empresa  FROM pqrsds 
    INNER JOIN usuarios, categorias, estados ON pqrsds.id_usuario = usuarios.id_usuario AND pqrsds.id_categoria = categorias.id_categoria AND pqrsds.id_estado = estados.id_estado`;

  conexion.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(
        `${row.Cedula} ${row.Nombre} ${row.Estado} ${row.Categoria} ${row.fecha} ${row.asunto} ${row.Empresa}`
      );
    });
  });

  conexion.close();
}
  */