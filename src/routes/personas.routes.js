import { Router } from "express";
import pool from "../database.js";

const router = Router();

router.get('/list', async(req,res) =>{
    try{
        const [result] = await pool.query('SELECT id_pqrsd, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN usuarios ON pqrsds.id_usuario = usuarios.id_usuario INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado;');
        res.render('personas/list', {personas: result})

    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.get('/add', async(req,res) =>{
    const [categoria] = await pool.query('SELECT id_categoria, nombre_categoria FROM categorias');
    const [estado] = await pool.query('SELECT id_estado, nombre_estado FROM estados');
    //await pool.query('SELECT id_categoria, nombre_categoria FROM categorias;')
    res.render('personas/add', {seleccionCategoria: categoria, seleccionEstado: estado});
    
})

router.post('/add', async(req,res) => {
    try{
        const {id_pqrsd, id_usuario, id_categoria, id_estado, fecha, asunto} = req.body;
        const newPqrsd = {
            id_pqrsd, id_usuario, id_categoria, id_estado, fecha, asunto
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
        const [categoria] = await pool.query('SELECT id_categoria, nombre_categoria FROM categorias');
        const [estado] = await pool.query('SELECT id_estado, nombre_estado FROM estados');
        const [persona] = await pool.query('SELECT * FROM pqrsds INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado WHERE id_pqrsd = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', {seleccionCategoria: categoria, seleccionEstado: estado, persona: personaEdit});
        
    //await pool.query('SELECT id_categoria, nombre_categoria FROM categorias;')
    //res.render('personas/add', {});


    } catch (err) {
        res.status(500).json({message:err.message});
    }
})

router.post('/edit/:id' , async(req,res) => {
    try {
        const {id_pqrsd, id_usuario, id_categoria, id_estado, fecha, asunto} = req.body;
        const {id} = req.params;
        const editPersona = {id_pqrsd, id_usuario, id_categoria, id_estado, fecha, asunto};
        await pool.query('UPDATE pqrsds SET ? WHERE id_pqrsd = ?', [editPersona, id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})

router.get('/delete/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM pqrsds WHERE id_pqrsd = ?', [id]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})


export default router;