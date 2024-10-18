const express = require('express');
const app = express();
const dbconnect = require('./config/db');
const tareasRouters = require('./router/tareas');

const loggingMiddleware = require('./middlewares/loggingMiddleware');
const errorMiddleware= require('./middlewares/errorMiddleware')
const nofoundMiddleware=require('./middlewares/nofoundMiddleware')


app.use(loggingMiddleware);// usamos todo el loggin en toda la app

app.use(express.json());
app.use(tareasRouters);
app.use(nofoundMiddleware)

app.use(errorMiddleware);

dbconnect().then(()=>{
    app.listen(3000, () => {
        console.log('servidor corriendo en puerto 3000');
   });
}).catch(err=>{
    console.log('no se pudo iniciar conexion a db');
});

