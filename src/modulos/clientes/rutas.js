const express = require('express');

const respuesta = require('../../red/respuestas')
const {crearCargo, leerCargos, actualizarCargo, eliminarCargo} = require('./controlador')

//const app = express();
//app.use(express.json())

const router = express.Router();
router.use(express.json())

/*
router.get('/', function (req, res){
    const listaRegistros = controlador.listaRegistros()
    respuesta.success(req, res, listaRegistros, 200);
})

*/

router.get('/cargos', (req, res) => {
    leerCargos((err, rows) =>{
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(200).json(rows)
        }
    })
})

router.post('/cargos', (req, res) => {
    const {nombre_cargo, descripcion_cargo} = req.body
    crearCargo(nombre_cargo, descripcion_cargo, (err, data) =>{
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(201).send(`Cargo creado con Id: ${data.id}`)
        }
    })
})

router.put('/cargos/:id_cargo', (req,res) => {
    const {nombre_cargo, descripcion_cargo} = req.body;
    actualizarCargo(req.params.id_cargo, nombre_cargo, descripcion_cargo, (err) => {
        if(err){
            res.status(500).send(err.message)
        }else{
            res.status(200).send('Cargo actualizado')
        }
    })
})

router.delete('/cargos/:id_cargo', (req, res) => {
    eliminarCargo(req.params.id_cargo, (err) => {
        if(err) {
            res.status(500).send(err.message)
        }else{
            res.status(200).send('Eliminado')
        }
    })
})

module.exports = router;
/*


*/