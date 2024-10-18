//middlewares/nofoundMiddleware.js

const nofoundMiddleware =(req, res , next) => {
    res.status(404).send({mesaje: "ruta no encontrada" })
    console.log('no found funcionando!');
    
};

module.exports=  nofoundMiddleware;
