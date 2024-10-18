const TOKEN_SECRETO='miTokenSecreto';

const authMiddleware= (req, res, next) =>{
    const token = req.headers['authorization']
    if(token=== TOKEN_SECRETO){
    next();//  si el token es correcto , ejecuta la siguiente función

    }else{
        res.status(403).send({mensaje:'Acceso denegado el Token es invalido o no due enviado'})
    }
};
module.exports = authMiddleware;