const express = require("express");
const router = express.Router()
const ModelTareas = require('../models/tareasmodel');
const errorMiddleware = require("../middlewares/errorMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//todas las tareas
router.get('/tareas', async(req,res)=>{
    try {
        const tareas = await ModelTareas.find()
        res.status(200).send(tareas);
    } catch (error) {
        // res.status(500).send({mensaje:'error a optener tareas',error})
        next(errorMiddleware)
    }
});

//tareas por id
router.get('/tareas/:id', async(req,res)=>{
    try {
        const tarea = await ModelTareas.findById(req.params.id);
        
        if (!tarea){
            res.status(404).send({mensaje:'tarea no encontrada'});
        } 
        res.status(200).send(tarea);
    }catch(error){
        res.status(500).send({mensaje:'error a optener tarea',error});
    }
});

//crear tareas
router.post('/tareas',authMiddleware, async(req,res)=>{
    const body =req.body;
    try{
        const nuevaTarea= await ModelTareas.create(body);
        res.status(201).send(nuevaTarea);
    }catch (error){
        res.status(400).send(error);
}
});

//actualizar por id
router.put('/tareas/:id', async(req,res)=>{
    try{
        const tareaActualizada =  await ModelTareas.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true});
        console.log("Actualizado");
        

        if(!tareaActualizada){
            return res.status(404).send({mensaje: "Tarea No encontrada"})
         }
         res.status(200).send(tareaActualizada);
    }catch(erro){
        res.status(400).send({mensaje:"Error al actualizar la tarea", error});
    }
});

//eliminar tarea
router.delete('/tareas/:id', async(req, res)=>{
    try {
        const tareaEliminada = await  ModelTareas.findByIdAndDelete(req.params.id);
        
        if(!tareaEliminada){
            return res.status(404).send({mensaje:"tarea no encontrada"});
        }

        res.status(200).send({mensaje:"tarea Eliminada Correctamente!"});
        console.log('se  elimino la tarea');

        
     } catch (error) {
        res.status(500).send({mensaje :"Error al eliminar la tarea",error});
    }
});

//____________________________________________________________________
// cambiar el prioridad de la tarea

router.put('/tareas/:id/completar', async(req, res) => {
    try {
        const tarea = await ModelTareas.findById(req.params.id);
        if(!tarea){
            return res.status(404).send({mensaje: "Tarea no encontrada"})
        }
        //cambiamos el estado de  la tarea
        tarea.completada = true;
        console.log("tarea completada!!!");
        
        await tarea.save();
        res.status(200).send(tarea);
    } catch (error) {
        res.status(400).send({mensaje:"Error al  cambiar el estado de la tarea", error});

    }
});


// Obtener tareas por prioridad
router.get('/tareas/prioridad/:nivel', async (req, res) => {
    const nivel = req.params.nivel; // Obtener el nivel de prioridad de los parámetros de la ruta
    try {
        // Buscar tareas que coincidan con el nivel de prioridad
        const tareasPorPrioridad = await ModelTareas.find({ prioridad: nivel });
        
        if (tareasPorPrioridad.length === 0) {
            return res.status(404).send({ mensaje: "No se encontraron tareas con esa prioridad" });
        }
        
        res.status(200).send(tareasPorPrioridad);
    } catch (error) {
        res.status(500).send({ mensaje: "Error al obtener tareas por prioridad", error });
    }
});

module.exports = router;
