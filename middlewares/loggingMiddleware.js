//middlewares/loggingMiddlewares.js
const loggingMiddleware = ( req,res, next) =>{
    const method= req.method;//metodo GET, POST,PUT,DELETE
    const url = req.url;//url de la solicitud
    const time = new Date().toLocaleString();//fecha y hora de la solicitud

    console.log(`[${time}] ${method} ${url}`);

    next();//pasar a al siguiente  middleware o ruta.

};
module.exports = loggingMiddleware;