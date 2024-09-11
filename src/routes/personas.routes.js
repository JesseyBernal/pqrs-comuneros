import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/list', async(req,res) =>{
    try{
        const [result] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado ORDER BY fecha DESC;');
        const [contarPendiente] = await pool.query('SELECT COUNT(*) AS pendiente FROM pqrsds WHERE id_estado = 2;')
        const [contarEspera] = await pool.query('SELECT COUNT(*) AS espera FROM pqrsds WHERE id_estado = 3;')
        const cPendiente = contarPendiente[0];
        const cEspera = contarEspera[0];
        res.render('personas/list', {personas: result, contarPendiente: cPendiente, contarEspera: cEspera})

    }catch(err){
        res.status(500).json({message:err.message});
    }
})
  

router.get('/list/page', async(req, res) => {
        const [users] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado ORDER BY fecha DESC;')
        const [contarPendiente] = await pool.query('SELECT COUNT(*) AS pendiente FROM pqrsds WHERE id_estado = 2;')
        const [contarEspera] = await pool.query('SELECT COUNT(*) AS espera FROM pqrsds WHERE id_estado = 3;')
        const cPendiente = contarPendiente[0];
        const cEspera = contarEspera[0];
        const page = req.query.page
        const limit = req.query.limit

        const starIndex = (page - 1) * limit
        const endIndex = page * limit
        
        const resultUsers = users.slice(starIndex, endIndex)
        res.render('personas/list', {personas: resultUsers, contarPendiente: cPendiente, contarEspera: cEspera})
   
})

router.get('/add', async(req,res) =>{
    const [categoria] = await pool.query('SELECT id_categoria, nombre_categoria FROM categorias;');
    const [estado] = await pool.query('SELECT id_estado, nombre_estado FROM estados;');
    const [administrador] = await pool.query('SELECT id_administrador, nombre_administrador FROM administradores;');
    //await pool.query('SELECT id_categoria, nombre_categoria FROM categorias;')
    res.render('personas/add', {seleccionCategoria: categoria, seleccionEstado: estado, seleccionAdministrador: administrador});
    
})

router.post('/add', async(req,res) => {
    try{
        const {id_pqrsd, id_local, id_categoria, id_estado,  asunto, fecha, id_administrador} = req.body;
        const newPqrsd = {
            id_pqrsd, id_local, id_categoria, id_estado,  asunto, fecha, id_administrador
        }        

        await pool.query('INSERT INTO pqrsds SET ?', [newPqrsd]);
        res.redirect('/list')   
        

    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/edit/:id' , async(req,res) =>{
    try {
        const {id} = req.params;
        const [categoria] = await pool.query('SELECT id_categoria, nombre_categoria FROM categorias;');
        const [estado] = await pool.query('SELECT id_estado, nombre_estado FROM estados;');
        const [administrador] = await pool.query('SELECT id_administrador, nombre_administrador FROM administradores;');
        const [persona] = await pool.query('SELECT * FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador WHERE id_pqrsd = ?;', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', {seleccionCategoria: categoria, seleccionEstado: estado, persona: personaEdit, seleccionAdministrador: administrador});
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id' , async(req,res) => {
    try {
        const {id} = req.params;
        const {id_pqrsd, id_local, id_categoria, id_estado, asunto, fecha, id_administrador} = req.body;        
        const editPersona = {id_pqrsd, id_local, id_categoria, id_estado, asunto, fecha, id_administrador};
        await pool.query('UPDATE pqrsds SET ? WHERE id_pqrsd = ?;', [editPersona, id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM pqrsds WHERE id_pqrsd = ?;', [id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})


export default router;