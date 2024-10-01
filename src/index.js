import exp from 'constants';
import express, { urlencoded } from 'express'
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import {join, dirname} from 'path'
import { fileURLToPath } from 'url';
import personasRoutes from './routes/personas.routes.js';

//Inicializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views',join(__dirname, 'views'));
app.engine('.hbs', engine({
    helpers: {
        when: ( function(operand_1, operator, operand_2, options) {
            var operators = {
            'eq': function(l,r) { return l == r; },
            'noteq': function(l,r) { return l != r; },
            'gt': function(l,r) { return Number(l) > Number(r); },
            'or': function(l,r) { return l || r; },
            'and': function(l,r) { return l && r; },
            '%': function(l,r) { return (l % r) === 0; }
            }
            , result = operators[operator](operand_1,operand_2);
        
            if (result) return options.fn(this);
            else  return options.inverse(this);
        })
    },
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

// var hbs = engine.create({
//     helpers: {
//         Handlebars: ( "when",function(operand_1, operator, operand_2, options) {
//             var operators = {
//              'eq': function(l,r) { return l == r; },
//              'noteq': function(l,r) { return l != r; },
//              'gt': function(l,r) { return Number(l) > Number(r); },
//              'or': function(l,r) { return l || r; },
//              'and': function(l,r) { return l && r; },
//              '%': function(l,r) { return (l % r) === 0; }
//             }
//             , result = operators[operator](operand_1,operand_2);
          
//             if (result) return options.fn(this);
//             else  return options.inverse(this);
//           })
//     }
// })
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false}));
app.use(express.json());

//Routes
app.get('/', (req, res) => {
    res.render('index')
})
app.use(personasRoutes);

//Public Files
app.use(express.static(join(__dirname, 'public')));

//Run Server
app.listen(app.get('port'), ()=>
    console.log('Noah Mundo', app.get('port')));



