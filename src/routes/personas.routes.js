import { Router } from "express";
import pool from "../database.js";
import {/* auth *//* login, */ register, /* storeUser */} from "../controllers/LoginController.js";
import { isAuthenticated } from "../helpers/auth.js";

const router = Router();

router.get('/list', isAuthenticated, async(req, res) =>{
    try{              
        
        const [resultTotal] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado ORDER BY fecha DESC;');  
        const [contarPendiente] = await pool.query('SELECT COUNT(*) AS pendiente FROM pqrsds WHERE id_estado = 1;')
        // const [contarEspera] = await pool.query('SELECT COUNT(*) AS espera FROM pqrsds WHERE id_estado = 3;')
        const cPendiente = contarPendiente[0];
        // const cEspera = contarEspera[0];        
        const prueba = {name: req.session.name}
        
        res.render('personas/list', {personas: resultTotal, contarPendiente: cPendiente, /* contarEspera: cEspera, */ name: prueba })
    }catch(err){
        res.status(500).json({message:err.message});
        

    }
})

router.get('/notify', isAuthenticated, async(req,res) =>{
    try {

        const [resultTotal] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado WHERE pqrsds.id_estado = 1 ORDER BY fecha DESC;');

        const resultTotal1 = resultTotal.map((persona) => {
            //Fechas
            const time = new Date(persona.fecha);
            const actTime = new Date();
            //FormatoFechas
            const formattedDate = `${actTime.getFullYear()}-${actTime.getMonth() + 1}-${actTime.getDate()}`;
            const days = Date.parse(formattedDate) - Date.parse(time)
            const Difference_In_Days = Math.round (days / (1000 * 3600 * 24));
            // Numero de semanas
            var diff =(time.getTime() - actTime.getTime()) / 1000;
            diff /= (60 * 60 * 24 * 7);
            const weekdends = Math.abs(Math.round(diff));
            // Restar fines de semana
            var workDays = Difference_In_Days - (weekdends*2) 
            var resDays = 15 - workDays
            var solDays = 10 - workDays

                return {...persona, workDays, resDays, solDays}
            } ) 
            const prueba = {name: req.session.name}

            res.render('personas/pending', {personas: resultTotal1, name:prueba })

    } catch (err) {
        res.status(500).json({message:err.message});

    }
})

router.post('/list-search', isAuthenticated, async(req, res) => {
    try {

        const search = req.body.search       
        
        const [resultSearch] = await pool.query(`SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado WHERE pqrsds.id_local LIKE '%' ? '%' ORDER BY fecha DESC;`, [search]);


        // const [contarPendiente] = await pool.query('SELECT COUNT(*) AS pendiente FROM pqrsds WHERE id_estado = 2 AND pqrsds.id_local = ?;', [search])
        // const [contarEspera] = await pool.query('SELECT COUNT(*) AS espera FROM pqrsds WHERE id_estado = 3 AND pqrsds.id_local = ?;', [search])
        // const cPendiente = contarPendiente[0];
        // const cEspera = contarEspera[0];
        
        // const resultSearch1= resultSearch.map((persona) => {
        //     return {...persona, search}

        //     } ) 
        const prueba = {name: req.session.name}
        res.render('personas/search', {personas: resultSearch, busqueda: search, name: prueba /* contarPendiente: cPendiente, contarEspera: cEspera */})           

    } catch (err) {
        res.status(500).json({message:err.message});
        // res.render('personas/list', { message: err.message })
    }
})

router.get('/list-cat/:id', isAuthenticated, async(req, res) => {  
    try{   

        const {id} = req.params;

        const [resultTotal] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado WHERE pqrsds.id_estado = ? ORDER BY fecha DESC;', [id]);           

        const [contarPendiente] = await pool.query('SELECT COUNT(*) AS pendiente FROM pqrsds WHERE id_estado = 1;')
        // const [contarEspera] = await pool.query('SELECT COUNT(*) AS espera FROM pqrsds WHERE id_estado = 3;')
        const cPendiente = contarPendiente[0];
        // const cEspera = contarEspera[0];
        const prueba = {name: req.session.name}
        res.render('personas/list', {personas: resultTotal, contarPendiente: cPendiente, /* contarEspera: cEspera, */ name: prueba})

    }catch(err){
        res.status(500).json({message:err.message});
    }

})

router.get('/list-page', isAuthenticated, async(req, res) => {
        const [users] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado ORDER BY fecha DESC;')
        
        const [contarPendiente] = await pool.query('SELECT COUNT(*) AS pendiente FROM pqrsds WHERE id_estado = 1;')
        // const [contarEspera] = await pool.query('SELECT COUNT(*) AS espera FROM pqrsds WHERE id_estado = 3;')
        const cPendiente = contarPendiente[0];
        // const cEspera = contarEspera[0];

        const {page, limit} = req.query
        const offset = (page - 1) * limit
        const [data] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado ORDER BY fecha DESC limit ? offset ?', [+limit, +offset])
        const [totalPageData] = await pool.query ('SELECT COUNT(*) AS count FROM pqrsds')
        const totalPage = Math.ceil(+totalPageData[0]?.count / limit)
        //Probando
        console.log(totalPage)
        /*
        res.json({
            data: data,
            pagination: {
                page: +page,
                limit: +limit,
                totalPage
            }
        })
        */
        /*
        const page = req.query.page
        const limit = req.query.limit

        const starIndex = (page - 1) * limit
        const endIndex = page * limit
        
        const resultUsers = users.slice(starIndex, endIndex)
        console.log(resultUsers)
        */
        const prueba = {name: req.session.name}
        res.render('personas/list', {personas: data, contarPendiente: cPendiente, /* contarEspera: cEspera, */ name: prueba})

})

router.get('/add', isAuthenticated, async(req,res) =>{
    
    const [categoria] = await pool.query('SELECT id_categoria, nombre_categoria FROM categorias;');
    const [estado] = await pool.query('SELECT id_estado, nombre_estado FROM estados;');
    const [administrador] = await pool.query('SELECT id_administrador, nombre_administrador FROM administradores WHERE id_administrador = ?;',[req.session.id_admin]);
    const prueba = {name: req.session.name}
    res.render('personas/add', {seleccionCategoria: categoria, seleccionEstado: estado, seleccionAdministrador: administrador, name: prueba});
    
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

router.get('/details/:id', isAuthenticated, async(req,res) =>{
    try {
        const {id} = req.params;

        const [persona] = await pool.query('SELECT id_local as local, nombre_usuario, telefono_usuario, correo_usuario, nombre_estado, nombre_local, descripcion_local FROM locales INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN estados_locales ON locales.id_estado_local = estados_locales.id_estado_local WHERE id_local = ?;', [id]);
        const personaEdit = persona[0];

        const [result] = await pool.query('SELECT id_pqrsd, pqrsds.id_local AS local, nombre_administrador, nombre_usuario, nombre_categoria, nombre_estado,  fecha, asunto FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN usuarios ON locales.id_usuario = usuarios.id_usuario INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado WHERE pqrsds.id_local = ?;', [id]);

        const [contarPendiente] = await pool.query('SELECT COUNT(*) AS pendiente FROM pqrsds WHERE id_estado = 1 AND id_local = ?;', [id])
        // const [contarEspera] = await pool.query('SELECT COUNT(*) AS espera FROM pqrsds WHERE id_estado = 3 AND id_local = ?;', [id])
        const cPendiente = contarPendiente[0];
        // const cEspera = contarEspera[0];        

        const prueba = {name: req.session.name}

        res.render('personas/details', {persona: personaEdit, personas: result, contarPendiente: cPendiente, /* contarEspera: cEspera, */ name: prueba});

    } catch (err) {
        res.status(500).json({message:err.message});
    }
})

router.get('/edit/:id' , isAuthenticated, async(req,res) =>{
    try {
        const {id} = req.params;
        const [categoria] = await pool.query('SELECT id_categoria, nombre_categoria FROM categorias;');
        const [estado] = await pool.query('SELECT id_estado, nombre_estado FROM estados;');
        const [administrador] = await pool.query('SELECT id_administrador, nombre_administrador FROM administradores WHERE id_administrador = ?;',[req.session.id_admin]);

        const [persona] = await pool.query('SELECT * FROM pqrsds INNER JOIN locales ON pqrsds.id_local = locales.id_local INNER JOIN categorias ON pqrsds.id_categoria = categorias.id_categoria INNER JOIN estados ON pqrsds.id_estado = estados.id_estado INNER JOIN administradores ON pqrsds.id_administrador = administradores.id_administrador WHERE id_pqrsd = ?;', [id]);
        const personaEdit = persona[0];

        const prueba = {name: req.session.name}

        res.render('personas/edit', {seleccionCategoria: categoria, seleccionEstado: estado, persona: personaEdit, seleccionAdministrador: administrador, name: prueba});
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

router.get('/delete/:id', isAuthenticated, async(req, res) =>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM pqrsds WHERE id_pqrsd = ?;', [id]);

        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
})

export default router;