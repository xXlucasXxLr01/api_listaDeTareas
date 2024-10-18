const mongoose = require('mongoose');


const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fechaLimite: { type: Date },
  completada: { type: Boolean, default: false },
  prioridad: { type: String, enum: ['alta', 'media', 'baja'], default: 'media' },
  etiquetas: [{ type: String }]
},
{
  timestamps: true, // Añadir fechas de creación y modificación automáticamente
});

// Middleware para establecer fechaLimite automáticamente
tareaSchema.pre('save', function(next) {
  if (!this.fechaLimite) {
    this.fechaLimite = new Date(this.createdAt.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 días en milisegundos
  }
  next();
});

const ModelTareas=mongoose.model('tarea', tareaSchema);
module.exports = ModelTareas;