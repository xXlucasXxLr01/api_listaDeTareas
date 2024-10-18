const mongoose =  require('mongoose');

const dbconnect = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/dbListaDeTareas');
        console.log('Conexion a la base de datos');
    } catch (error){
        console.error('Error al conectarse a db', error);
        
    }
};
module.exports = dbconnect;
