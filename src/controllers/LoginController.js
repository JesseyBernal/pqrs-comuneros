import bcrypt, { hash } from 'bcrypt';
import pool from "../database.js";

// function login(req, res) {
//   res.render('personas/login');
// }

// function auth(req, res) {
//   const data = req.body
//   console.log(data)
// }

function register(req, res) {
    if(req.session.loggedin != true){
      res.render('personas/register');
    }else{
      res.redirect('/')
  } 
}


// async function  storeUser (req, res) {
//   const {name, email, password} = req.body;
//         const newUser = {
//             name, email, password
//         }  

//   const data = req.body;



//   const user =data.findOne({ email })
//   if (user) throw new Error('username already exist')

//   const hashedPassword = await bcrypt.hash(data.password, 10)
//   await pool.query('INSER INTO users SET ?', [data])
//   console.log(data)
  
//   res.redirect('/login')
// }

export {/* login */ register/* auth *//* storeUser */}
