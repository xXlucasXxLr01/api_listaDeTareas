//middlewares/errorMiddleware.js

const errorMiddleware = (error, req , res, next)=>{
  console.error(erro.stack);// Muestra el error  en la consola

  const  statusCode = error.status || 500;
  
  res.status(statusCode).send({
    mensaje: err.messege|| 'erro interno del servidor',
    error: statusCode === 500 ? 'Error interno': err.messege,

});
  
  
};
module.exports = errorMiddleware;